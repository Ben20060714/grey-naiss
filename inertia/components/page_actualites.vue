<script setup lang="ts">
import { ArrowRight, CalendarDays } from 'lucide-vue-next'

const actualites = [
  {
    date: '30 juin 2027',
    categorie: 'Fête nationale',
    titre: 'Lorem ipsum dolor sit amet adipiscing elit quam lori tali mbe ehtio.',
    description: 'Lorem ipsum dolor sit amet',
  },
  {
    date: '06 juillet 2027',
    categorie: 'Vie locale',
    titre: 'Lorem ipsum dolor sit amet adipiscing elit quam lori tali mbe ehtio',
    description: 'Lorem ipsum dolor sit amet adipiscing elit quam lori tali mbe ehtio como pomodoro laq um guit.',
  },
  {
    date: '28 mai 2028',
    categorie: 'Information',
    titre: 'Lorem ipsum dolor sit amet adipiscing elit quam lori tali mbe ehtio',
    description: 'Lorem ipsum dolor sit amet adipiscing elit quam lori tali mbe ehtio.',
  },
]
</script>

<template>
  <main class="page-publique">
    <section class="banniere-page">
      <div class="conteneur">
        <!-- <p class="sur-titre sur-titre--clair">La vie de la ville</p> -->
        <h1>Prenez les dernières nouvelles de la ville de<br /><em>Lubumbashi.</em></h1>
        <p>Lorem ipsum dolor sit amet adipiscing elit quam lori tali mbe ehtio</p>
      </div>
    </section>
    <section class="section section--actualites">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="sur-titre sur-titre--sombre">Actualités</p>
            <h2>Ce qui se passe dans la ville.</h2>
          </div>
          <span class="mention-page"><CalendarDays :size="15" /> Mise à jour</span>
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
              <a class="lien-souligne" href="/?page=contact">Demander une information <ArrowRight :size="15"/></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
