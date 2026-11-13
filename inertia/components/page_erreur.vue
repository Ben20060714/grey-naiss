<script setup lang="ts">
import { House, RotateCw } from 'lucide-vue-next'

function rechargerPage() {
  window.location.reload()
}
</script>

<template>
  <div class="page-erreur" role="alert">
    <strong>Cette page n’a pas pu être chargée.</strong>
    <span>Réessayez ou revenez à l’accueil pour poursuivre votre démarche.</span>
    <div class="page-erreur__actions">
      <button type="button" class="bouton bouton--sombre" @click="rechargerPage">
        <RotateCw :size="16" /> Réessayer
      </button>
      <a class="bouton bouton--secondaire" href="/"><House :size="16" /> Accueil</a>
    </div>
  </div>
</template>
