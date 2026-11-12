<script setup lang="ts">
import { BadgeCheck, Building2, ShieldCheck } from 'lucide-vue-next'
import Logo from '~/components/logo.vue'
import FlashToasts from '~/components/flash_toasts.vue'
// import ThemeToggle from '~/components/theme_toggle.vue'
</script>

<template>
  <div class="auth">
    <div class="auth__form-col">
      <Logo :size="28" />
      <div class="auth__form-wrap">
        <slot />
      </div>
      <div :style="{ height: '20px' }" />
    </div>

    <aside class="auth__aside">
      <div class="auth__aside-top">
        <!-- Option de thème désactivée : le site reste en mode clair. -->
        <!-- <ThemeToggle /> -->
      </div>

      <div class="auth__panneau-marque">
        <span class="auth__panneau-icone" aria-hidden="true"><Building2 :size="25" /></span>
        <p class="auth__panneau-sur-titre">Portail professionnel</p>
        <p class="auth__quote">L’état civil de Lubumbashi, au service des agents habilités.</p>
      </div>

      <div>
        <div class="pitch__t">
          <ShieldCheck :size="16" /> Espace réservé aux personnes habilitées
        </div>
        <p class="pitch__p">
          Les agents communaux, les agents de maternité et les responsables autorisés accèdent ici
          aux dossiers qui leur sont attribués.
        </p>
        <div class="auth__garantie">
          <BadgeCheck :size="16" /> Accès protégé par votre organisation
        </div>
      </div>
    </aside>
  </div>
  <FlashToasts />
</template>
