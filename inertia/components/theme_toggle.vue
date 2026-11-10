<script setup lang="ts">
import { ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Moon, Sun } from 'lucide-vue-next'

const NOM_COOKIE = 'app_theme'
const DUREE_UN_AN = 60 * 60 * 24 * 365

const pageInertia = usePage()
const theme = ref<'light' | 'dark'>(pageInertia.props.preferences?.theme ?? 'light')

function changerTheme() {
  const prochainTheme = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = prochainTheme
  document.documentElement.setAttribute('data-theme', prochainTheme)
  document.cookie = `${NOM_COOKIE}=${prochainTheme}; path=/; max-age=${DUREE_UN_AN}; samesite=lax`
}
</script>

<template>
  <button
    type="button"
    class="iconbtn"
    :aria-label="theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'"
    :title="theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'"
    @click="changerTheme"
  >
    <Sun
      :size="16"
      class="themetoggle__icon"
      :class="{ 'themetoggle__icon--on': theme === 'dark' }"
    />
    <Moon
      :size="16"
      class="themetoggle__icon"
      :class="{ 'themetoggle__icon--on': theme !== 'dark' }"
    />
  </button>
</template>
