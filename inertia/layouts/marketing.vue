<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Link } from '@adonisjs/inertia/vue'
import Logo from '~/components/logo.vue'
import FlashToasts from '~/components/flash_toasts.vue'
import ThemeToggle from '~/components/theme_toggle.vue'

const pageInertia = usePage()
const menuOuvert = ref(false)

function fermerMenu() {
  menuOuvert.value = false
}
</script>

<template>
  <header class="en-tete en-tete--municipal">
    <div class="conteneur en-tete__interieur">
      <Logo :size="34" />
      <button
        class="bouton-menu"
        type="button"
        :aria-expanded="menuOuvert"
        aria-controls="navigation-principale"
        aria-label="Ouvrir le menu"
        @click="menuOuvert = !menuOuvert"
      >
        <X v-if="menuOuvert" :size="22" /><Menu v-else :size="22" />
      </button>
      <nav
        id="navigation-principale"
        class="navigation-principale"
        :class="{ 'navigation-principale--ouverte': menuOuvert }"
        aria-label="Navigation principale"
      >
        <a href="/?page=accueil" @click="fermerMenu">Accueil</a>
        <a href="/?page=services" @click="fermerMenu">Services</a>
        <a href="/?page=actualites" @click="fermerMenu">Actualités</a>
        <a href="/?page=contact" @click="fermerMenu">Contact</a>
        <span class="navigation-principale__separateur" />
        <ThemeToggle />
        <template v-if="pageInertia.props.user"
          ><Link route="dashboard" class="bouton bouton--sombre bouton--petit"
            >Mon espace</Link
          ></template
        >
        <template v-else
          ><Link route="session.create" class="bouton bouton--texte bouton--petit"
            >Se connecter</Link
          ><Link route="new_account.create" class="bouton bouton--sombre bouton--petit"
            >Créer un compte</Link
          ></template
        >
      </nav>
    </div>
  </header>
  <slot />
  <footer class="pied-de-page">
    <div class="conteneur pied-de-page__interieur">
      <Logo :size="30" />
      <p>Le site officiel de la mairie de Lubumbashi</p>
      <span>© 2026 Mairie de Lubumbashi — Tous droits réservés</span>
    </div>
  </footer>
  <FlashToasts />
</template>
