<script setup lang="ts">
import { Clock3, Mail, MapPin, Phone } from 'lucide-vue-next'
</script>

<template>
  <main class="page-publique">
    <section class="banniere-page">
      <div class="conteneur">
        <!-- <p class="sur-titre sur-titre--clair">Accueil municipal</p> -->
        <h1>Contacter la<br /><em>mairie de Lubumbashi.</em></h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptates sunt excepturi aliquam..
        </p>
      </div>
    </section>
    <section class="section section--contact">
      <div class="conteneur contact-page">
        <div>
          <p class="sur-titre sur-titre--sombre">Nous vous orientons</p>
          <h2>Une question sur une démarche ?</h2>
          <p class="contact-page__intro">
            Pour les dossiers d’état civil, veuillez vous munir de votre/vos pièce(s) d'identité et vous adresser
            au bureau compétent.
          </p>
        </div>
        <div class="liste-coordonnees">
          <div>
            <span><MapPin :size="18" /></span>
            <div>
              <strong>Hôtel de ville</strong>
              <p>Lubumbashi, Haut-Katanga</p>
            </div>
          </div>
          <div>
            <span><Clock3 :size="18" /></span>
            <div>
              <strong>Heures de lorem</strong>
              <p>Lorem ipsum dolor sit</p>
            </div>
          </div>
          <div>
            <span><Phone :size="18" /></span>
            <div>
              <strong>Téléphone</strong>
              <p>+243820433981</p>
            </div>
          </div>
          <div>
            <span><Mail :size="18" /></span>
            <div>
              <strong>Courriel</strong>
              <p>Havidu6@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
