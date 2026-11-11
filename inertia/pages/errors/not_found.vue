<script setup lang="ts">
import { ArrowRight, FileText, House, Phone, SearchX } from 'lucide-vue-next'
import { Head } from '@inertiajs/vue3'
import MarketingLayout from '~/layouts/marketing.vue'
</script>

<template>
  <MarketingLayout>
    <Head title="Page non trouvée" />
    <main class="page-erreur-systeme">
      <section class="page-erreur-systeme__hero" aria-labelledby="titre-erreur-404">
        <div class="conteneur page-erreur-systeme__grille">
          <div class="page-erreur-systeme__contenu">
            <p class="sur-titre sur-titre--clair">Erreur 404 · Orientation</p>
            <h1 id="titre-erreur-404">Cette page s’est<br /><em>égarée.</em></h1>
            <p>
              L’adresse demandée n’existe pas ou a été déplacée. Revenez à l’accueil ou choisissez
              un service municipal pour continuer.
            </p>
            <a class="bouton bouton--clair" href="/">
              Retour à l’accueil <ArrowRight :size="17" />
            </a>
          </div>
          <div class="page-erreur-systeme__badge" aria-hidden="true">
            <span>404</span>
            <SearchX :size="54" stroke-width="1.3" />
            <small>Adresse introuvable</small>
          </div>
        </div>
      </section>

      <section
        class="section section--services page-erreur-systeme__actions"
        aria-labelledby="titre-suggestions"
      >
        <div class="conteneur">
          <div class="entete-section">
            <div>
              <p class="sur-titre sur-titre--sombre">Orientation</p>
              <h2 id="titre-suggestions">Où souhaitez-vous aller ?</h2>
            </div>
          </div>

          <div class="grille-services">
            <a class="carte-service" href="/">
              <span class="carte-service__icone">
                <House :size="21" />
              </span>
              <span class="carte-service__titre">Accueil</span>
              <span class="carte-service__description"> Revenir à la page principale. </span>
              <ArrowRight class="carte-service__fleche" :size="18" />
            </a>

            <a class="carte-service" href="/?page=services">
              <span class="carte-service__icone">
                <FileText :size="21" />
              </span>
              <span class="carte-service__titre">Démarches & État civil</span>
              <span class="carte-service__description">
                Consulter les démarches d’enregistrement des naissances et démarches citoyennes.
              </span>
              <ArrowRight class="carte-service__fleche" :size="18" />
            </a>

            <a class="carte-service" href="/?page=contact">
              <span class="carte-service__icone">
                <Phone :size="21" />
              </span>
              <span class="carte-service__titre">Contacter la mairie</span>
              <span class="carte-service__description">
                Joindre nos services municipaux ou obtenir une assistance administrative.
              </span>
              <ArrowRight class="carte-service__fleche" :size="18" />
            </a>
          </div>
        </div>
      </section>
    </main>
  </MarketingLayout>
</template>
