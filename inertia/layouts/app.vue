<script setup lang="ts">
import { House, LogOut } from 'lucide-vue-next'
import { Form } from '@adonisjs/inertia/vue'
import Logo from '~/components/logo.vue'
import FlashToasts from '~/components/flash_toasts.vue'
// import ThemeToggle from '~/components/theme_toggle.vue'
import NavLink, { type NavItem } from '~/components/nav_link.vue'

// Navigation visible dans l’espace réservé aux agents connectés.
const navigation: NavItem[] = [{ label: 'Dossiers de naissance', route: 'dashboard', icon: House }]
</script>

<template>
  <header class="header header--bar">
    <div class="header__inner">
      <Logo :size="28" />
      <div class="header__right">
        <!-- Option de thème désactivée : le site reste en mode clair. -->
        <!-- <ThemeToggle /> -->
        <Form route="session.destroy">
          <button type="submit" class="btn btn--secondary btn--sm">
            <LogOut :size="15" /> Se déconnecter
          </button>
        </Form>
      </div>
    </div>
  </header>

  <nav class="subnav">
    <div class="subnav__inner">
      <NavLink
        v-for="item in navigation"
        :key="item.label"
        :route="item.route"
        class="subnav__item"
      >
        <component :is="item.icon" v-if="item.icon" :size="14" />
        {{ item.label }}
      </NavLink>
    </div>
  </nav>

  <div class="app-main">
    <slot />
  </div>
  <FlashToasts />
</template>
