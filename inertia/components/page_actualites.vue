<script setup lang="ts">
import { ArrowRight, CalendarDays } from 'lucide-vue-next'

const actualites = [
  {
    date: '12 juin 2026',
    categorie: 'Vie municipale',
    titre: 'La ville prépare la modernisation de ses services d’état civil',
    description:
      'La mairie de Lubumbashi présente les prochaines étapes de la transformation numérique.',
  },
  {
    date: '06 juin 2026',
    categorie: 'Vie locale',
    titre: 'Les initiatives citoyennes au cœur des quartiers',
    description: 'Retrouvez les projets qui rapprochent les services municipaux des habitants.',
  },
  {
    date: '28 mai 2026',
    categorie: 'Information',
    titre: 'Les pièces à préparer pour une déclaration de naissance',
    description:
      'Un rappel pratique pour préparer sereinement vos démarches auprès de l’état civil.',
  },
]
</script>

<template>
  <main class="page-publique">
    <section class="banniere-page">
      <div class="conteneur">
        <p class="sur-titre sur-titre--clair">La vie de la ville</p>
        <h1>Les nouvelles de<br /><em>Lubumbashi.</em></h1>
        <p>Les informations officielles et les rendez-vous qui concernent les habitants.</p>
      </div>
    </section>
    <section class="section section--actualites">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="sur-titre sur-titre--sombre">Actualités</p>
            <h2>Ce qui se passe dans la ville.</h2>
          </div>
          <span class="mention-page"><CalendarDays :size="15" /> Mise à jour municipale</span>
        </div>
        <div class="grille-actualites grille-actualites--page">
          <article v-for="actualite in actualites" :key="actualite.titre" class="carte-actualite">
            <div class="carte-actualite__image" aria-hidden="true">
              <span>{{ actualite.categorie.slice(0, 1) }}</span>
            </div>
            <div class="carte-actualite__contenu">
              <p class="carte-actualite__meta">{{ actualite.categorie }} · {{ actualite.date }}</p>
              <h3>{{ actualite.titre }}</h3>
              <p>{{ actualite.description }}</p>
              <a class="lien-souligne" href="/?page=contact"
                >Demander une information <ArrowRight :size="15"
              /></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
