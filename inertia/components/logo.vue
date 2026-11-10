<script setup lang="ts">
import { Link } from '@adonisjs/inertia/vue'

withDefaults(defineProps<{ size?: number }>(), { size: 32 })
</script>

<template>
  <Link route="home" class="logo-mairie" aria-label="Accueil de la mairie">
    <span
      class="logo-mairie__symbole"
      :style="{ width: `${size}px`, height: `${size}px` }"
      aria-hidden="true"
      ><svg viewBox="0 0 32 32" fill="none">
        <path
          d="M5 13.5 16 5l11 8.5"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 13.5h16M9 14v10m4-10v10m6-10v10m4-10v10M6 25h20"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
        /></svg
    ></span>
    <span class="logo-mairie__nom">Mairie de<br /><strong>Lubumbashi</strong></span>
  </Link>
</template>
