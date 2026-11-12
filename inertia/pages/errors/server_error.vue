<script setup lang="ts">
import { ArrowRight, House, RotateCw, ServerCrash } from 'lucide-vue-next'
import { Head } from '@inertiajs/vue3'
import MarketingLayout from '~/layouts/marketing.vue'

function recharger() {
  window.location.reload()
}
</script>

<template>
  <MarketingLayout>
    <Head title="Service momentanément indisponible" />
    <main class="page-erreur-systeme">
      <section class="page-erreur-systeme__hero" aria-labelledby="titre-erreur-500">
        <div class="conteneur page-erreur-systeme__grille">
          <div class="page-erreur-systeme__contenu">
            <p class="sur-titre sur-titre--clair">Erreur 500 · Service temporaire</p>
            <h1 id="titre-erreur-500">Une pause<br /><em>technique.</em></h1>
            <p>
              Le service de la mairie a rencontré une difficulté imprévue. Vous pouvez réessayer
              maintenant ou revenir à l’accueil.
            </p>
            <button type="button" class="bouton bouton--clair" @click="recharger">
              Réessayer <RotateCw :size="17" />
            </button>
          </div>
          <div
            class="page-erreur-systeme__badge page-erreur-systeme__badge--incident"
            aria-hidden="true"
          >
            <span>500</span>
            <ServerCrash :size="54" stroke-width="1.3" />
            <small>Service momentanément indisponible</small>
          </div>
        </div>
      </section>

      <section
        class="section section--services page-erreur-systeme__actions"
        aria-labelledby="titre-resolution"
      >
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
                <House :size="21" />
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
