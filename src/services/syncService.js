import { computed, ref } from 'vue'
import db, { QUEUE_STATUS, SYNC_STATUS } from '../db/database'

const isOnline = ref(typeof navigator === 'undefined' ? true : navigator.onLine)
const pendingCount = ref(0)
const isSynchronizing = ref(false)
const lastSyncError = ref(null)
let removeListeners = null

const isoNow = () => new Date().toISOString()
const localId = (prefix) => {
  const randomPart = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
  return `${prefix}-${randomPart}`
}

/** Produit OP-LUB-KAM-2026-000000123 avec un compteur local durable. */
export async function generateOperationId({ province = 'LUB', commune = 'KAM' } = {}) {
  const sequence = (await db.syncQueue.count()) + 1
  return `OP-${province}-${commune}-${new Date().getFullYear()}-${String(sequence).padStart(9, '0')}`
}

export async function refreshPendingCount() {
  pendingCount.value = await db.syncQueue
    .where('status')
    .anyOf(QUEUE_STATUS.PENDING, QUEUE_STATUS.PROCESSING, QUEUE_STATUS.FAILED)
    .count()
  return pendingCount.value
}

/** Enregistre tout le dossier et sa file dans une transaction atomique. */
export async function saveBirthDossier({ person, birth, parents = [], declaration = null }) {
  const createdAt = isoNow()
  const operationId = await generateOperationId({
    province: birth.provinceCode || 'LUB',
    commune: birth.communeCode || 'KAM',
  })
  const personRecord = {
    ...person, id: person.id || localId('PERSON'), syncStatus: SYNC_STATUS.PENDING,
    createdAt: person.createdAt || createdAt, updatedAt: createdAt,
  }
  const birthRecord = {
    ...birth, id: birth.id || localId('BIRTH'), childId: personRecord.id,
    syncStatus: SYNC_STATUS.PENDING, createdAt: birth.createdAt || createdAt, updatedAt: createdAt,
  }
  const parentRecords = parents.map((parent) => ({
    ...parent, id: parent.id || localId('PARENT'), birthId: birthRecord.id,
    syncStatus: SYNC_STATUS.PENDING, createdAt: parent.createdAt || createdAt,
  }))
  const declarationRecord = declaration && {
    ...declaration, id: declaration.id || localId('DECLARATION'), birthId: birthRecord.id,
    syncStatus: SYNC_STATUS.PENDING, createdAt: declaration.createdAt || createdAt, updatedAt: createdAt,
  }

  await db.transaction('rw', db.persons, db.births, db.parents, db.declarations, db.syncQueue, async () => {
    await db.persons.put(personRecord)
    await db.births.put(birthRecord)
    if (parentRecords.length) await db.parents.bulkPut(parentRecords)
    if (declarationRecord) await db.declarations.put(declarationRecord)
    await db.syncQueue.add({
      operationId, entity: 'BIRTH_DOSSIER', entityId: birthRecord.id, action: 'CREATE',
      payload: { person: personRecord, birth: birthRecord, parents: parentRecords, declaration: declarationRecord },
      status: QUEUE_STATUS.PENDING, attempts: 0, createdAt, nextAttemptAt: createdAt,
    })
  })
  await refreshPendingCount()
  return { operationId, person: personRecord, birth: birthRecord, declaration: declarationRecord }
}

// Squelette FastAPI : operationId est envoyé comme clé d'idempotence.
async function sendToFastApi(operation) {
  await Promise.resolve()
  return { accepted: true, idempotencyKey: operation.operationId }
}

/** Rejoue les opérations en attente ; un même operationId ne crée pas de doublon serveur. */
export async function synchronizeQueue() {
  if (!isOnline.value || isSynchronizing.value) return { synchronized: 0, skipped: true }
  isSynchronizing.value = true
  lastSyncError.value = null
  let synchronized = 0
  try {
    const operations = await db.syncQueue.where('status').anyOf(QUEUE_STATUS.PENDING, QUEUE_STATUS.FAILED).sortBy('createdAt')
    for (const operation of operations) {
      if (!isOnline.value) break
      await db.syncQueue.update(operation.id, {
        status: QUEUE_STATUS.PROCESSING, attempts: (operation.attempts || 0) + 1, lastAttemptAt: isoNow(),
      })
      try {
        await sendToFastApi(operation)
        await db.transaction('rw', db.syncQueue, db.persons, db.births, db.parents, db.declarations, async () => {
          await db.syncQueue.update(operation.id, { status: QUEUE_STATUS.COMPLETED, synchronizedAt: isoNow() })
          await db.persons.where('id').equals(operation.payload.person.id).modify({ syncStatus: SYNC_STATUS.SYNCHRONIZED })
          await db.births.where('id').equals(operation.payload.birth.id).modify({ syncStatus: SYNC_STATUS.SYNCHRONIZED })
          if (operation.payload.parents.length) {
            await db.parents.bulkPut(operation.payload.parents.map((parent) => ({ ...parent, syncStatus: SYNC_STATUS.SYNCHRONIZED })))
          }
          if (operation.payload.declaration) {
            await db.declarations.where('id').equals(operation.payload.declaration.id).modify({ syncStatus: SYNC_STATUS.SYNCHRONIZED })
          }
        })
        synchronized += 1
      } catch (error) {
        await db.syncQueue.update(operation.id, { status: QUEUE_STATUS.FAILED, lastError: error.message })
        lastSyncError.value = error
      }
    }
  } finally {
    isSynchronizing.value = false
    await refreshPendingCount()
  }
  return { synchronized, skipped: false }
}

/** Initialise les événements réseau et retourne une fonction de nettoyage. */
export function initializeConnectivity() {
  if (typeof window === 'undefined') return () => {}
  if (removeListeners) return removeListeners
  const handleOnline = () => { isOnline.value = true; void synchronizeQueue() }
  const handleOffline = () => { isOnline.value = false }
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  removeListeners = () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
    removeListeners = null
  }
  void refreshPendingCount()
  if (isOnline.value) void synchronizeQueue()
  return removeListeners
}

export const connectivityState = {
  isOnline: computed(() => isOnline.value),
  pendingCount: computed(() => pendingCount.value),
  isSynchronizing: computed(() => isSynchronizing.value),
  lastSyncError: computed(() => lastSyncError.value),
}
