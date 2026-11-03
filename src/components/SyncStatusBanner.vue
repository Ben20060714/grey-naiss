<script setup>
import { onMounted, onUnmounted } from 'vue'
import { connectivityState, initializeConnectivity, synchronizeQueue } from '../services/syncService'

const { isOnline, pendingCount, isSynchronizing } = connectivityState
let cleanup

onMounted(() => { cleanup = initializeConnectivity() })
onUnmounted(() => { cleanup?.() })
</script>

<template>
  <aside
    class="w-full border-b px-4 py-3 shadow-sm transition-colors duration-300 sm:px-6"
    :class="isOnline ? 'border-emerald-200 bg-emerald-50' : 'border-orange-200 bg-orange-50'"
    role="status"
    aria-live="polite"
  >
    <div class="mx-auto flex max-w-7xl items-start gap-3 sm:items-center">
      <span class="relative mt-1 flex h-3 w-3 shrink-0 sm:mt-0" aria-hidden="true">
        <span v-if="!isOnline" class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-60 motion-reduce:animate-none" />
        <span class="relative inline-flex h-3 w-3 rounded-full" :class="isOnline ? 'bg-emerald-500' : 'bg-orange-500'" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold tracking-tight" :class="isOnline ? 'text-emerald-950' : 'text-orange-950'">
          {{ isOnline ? 'En Ligne' : 'Mode Hors-Connexion activé' }}
        </p>
        <p class="mt-0.5 text-xs leading-5 sm:text-sm" :class="isOnline ? 'text-emerald-800' : 'text-orange-800'">
          <template v-if="isOnline">
            <span v-if="isSynchronizing">Synchronisation de {{ pendingCount }} fichier(s) en cours…</span>
            <span v-else-if="pendingCount">{{ pendingCount }} fichier(s) en attente de synchronisation.</span>
            <span v-else>Toutes les données sont synchronisées.</span>
          </template>
          <template v-else>Votre travail est sauvegardé localement en toute sécurité et sera synchronisé dès le retour du réseau.</template>
        </p>
      </div>
      <button
        v-if="isOnline && pendingCount && !isSynchronizing"
        type="button"
        class="min-h-11 shrink-0 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        @click="synchronizeQueue"
      >Synchroniser</button>
    </div>
  </aside>
</template>
