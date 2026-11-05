<script setup lang="ts">
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

      <p class="auth__quote">
        Un accès sécurisé aux outils d’état civil de la mairie de Lubumbashi.
      </p>

      <div>
        <div class="pitch__t">Espace réservé aux personnes habilitées</div>
        <p class="pitch__p">
          Les agents communaux, les agents de maternité et les responsables autorisés accèdent ici
          aux dossiers qui leur sont attribués.
        </p>
        <span class="il pitch__a">Les droits sont déterminés par l’organisation.</span>
      </div>
    </aside>
  </div>
  <FlashToasts />
</template>
