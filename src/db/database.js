import Dexie from 'dexie'

export const SYNC_STATUS = Object.freeze({
  PENDING: 'NON SYNCHRONISÉ',
  SYNCHRONIZED: 'SYNCHRONISÉ',
  ERROR: 'ERREUR DE SYNCHRONISATION',
})

export const QUEUE_STATUS = Object.freeze({
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
})

/** Base IndexedDB locale : chaque dossier reste exploitable sans réseau. */
export const db = new Dexie('etat-civil-lubumbashi')

db.version(1).stores({
  // PERSON : enfant, parent ou déclarant.
  persons: 'id, nationalId, lastName, firstName, dateOfBirth, updatedAt, syncStatus',
  // PARENT : relation entre une personne et un acte de naissance.
  parents: 'id, birthId, personId, relationship, createdAt, syncStatus',
  // BIRTH : acte de naissance ; childId/motherId/fatherId référencent PERSON.
  births: 'id, birthRegistrationNumber, childId, motherId, fatherId, birthDate, commune, createdAt, updatedAt, syncStatus',
  // DECLARATION : déclaration administrative rattachée à un acte.
  declarations: 'id, declarationNumber, birthId, declarantPersonId, status, createdAt, updatedAt, syncStatus',
  // SYNC_QUEUE : journal durable des opérations et de leur idempotency key.
  syncQueue: '++id, operationId, entity, entityId, action, status, attempts, createdAt, nextAttemptAt, [status+createdAt]',
})

export default db
