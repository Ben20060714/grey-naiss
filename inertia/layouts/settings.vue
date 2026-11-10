<script setup lang="ts">
import Page from '~/components/page.vue'
import NavLink, { type NavItem } from '~/components/nav_link.vue'

/**
 * Pages de la zone de paramétrage listées dans la barre latérale.
 */
const items: NavItem[] = []
</script>

<template>
  <Page
    title="Paramètres"
    description="Gérez les préférences de votre compte et vos options professionnelles."
  >
    <div class="sidebar-layout">
      <nav class="sidebar-layout__nav" aria-label="Paramètres">
        <NavLink
          v-for="item in items"
          :key="item.label"
          :route="item.route"
          exact
          class="sidebar-layout__item"
        >
          <component :is="item.icon" v-if="item.icon" :size="16" />
          {{ item.label }}
        </NavLink>
      </nav>
      <div class="sidebar-layout__content panel">
        <slot />
      </div>
    </div>
  </Page>
</template>
