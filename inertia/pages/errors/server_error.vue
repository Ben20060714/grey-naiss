<script setup lang="ts">
import { ArrowRight, RotateCw, ShieldCheck } from 'lucide-vue-next'
import { Head } from '@inertiajs/vue3'
import MarketingLayout from '~/layouts/marketing.vue'

function recharger() {
  window.location.reload()
}
</script>

<template>
  <MarketingLayout>
    <Head title="Service momentanément indisponible" />
    <main class="page-publique">
      <section class="banniere-page">
        <div class="conteneur">
          <p class="sur-titre sur-titre--clair">Erreur 500 · Incident technique</p>
          <h1>Une difficulté<br /><em>technique est survenue.</em></h1>
          <p>
            Le serveur de la mairie a rencontré une situation imprévue. Nos équipes sont informées
            afin de rétablir le service au plus vite.
          </p>
        </div>
      </section>

      <section class="section section--services" aria-labelledby="titre-resolution">
        <div class="conteneur">
          <div class="entete-section">
            <div>
              <p class="sur-titre sur-titre--sombre">Continuité de service</p>
              <h2 id="titre-resolution">Que pouvez-vous faire ?</h2>
            </div>
          </div>

          <div class="grille-services">
            <button type="button" class="carte-service text-left" @click="recharger">
              <span class="carte-service__icone">
                <RotateCw :size="21" />
              </span>
              <span class="carte-service__titre">Actualiser la page</span>
              <span class="carte-service__description">
                Tenter à nouveau de charger la démarche après un court instant.
              </span>
              <ArrowRight class="carte-service__fleche" :size="18" />
            </button>

            <a class="carte-service" href="/">
              <span class="carte-service__icone">
                <ShieldCheck :size="21" />
              </span>
              <span class="carte-service__titre">Retourner à l’accueil</span>
              <span class="carte-service__description">
                Vos brouillons locaux conservés sur cet appareil restent en sécurité.
              </span>
              <ArrowRight class="carte-service__fleche" :size="18" />
            </a>
          </div>
        </div>
      </section>
    </main>
  </MarketingLayout>
</template>
