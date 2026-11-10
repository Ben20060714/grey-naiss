<script setup lang="ts">
import { ArrowRight, FileText, MapPin, QrCode, Search, ShieldCheck, Users } from 'lucide-vue-next'

const services = [
  {
    titre: 'Déclarer une naissance',
    description: 'Comprendre les étapes, les pièces à préparer et le délai de 90 jours.',
    icone: FileText,
  },
  {
    titre: 'Retrouver un service d’état civil',
    description: 'Identifier le bureau ou la maternité selon votre démarche.',
    icone: Search,
  },
  {
    titre: 'Vie locale et associative',
    description: 'Accéder aux informations utiles sur les initiatives et équipements de Lubumbashi.',
    icone: Users,
  },
  {
    titre: 'Vérifier un acte de naissance',
    description: 'La vérification par QR code sera disponible lorsque le service central sera activé.',
    icone: QrCode,
  },
]
</script>

<template>
  <main class="page-publique">
    <section class="banniere-page">
      <div class="conteneur">
        <!-- <p class="sur-titre sur-titre--clair">Services publics</p> -->
        <h1>Les services de la<br /><em>mairie de Lubumbashi.</em></h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laboriosam vel a, alias neque eius unde distinctio expedita facilis quod laborum consequatur molestias commodi architecto rerum quisquam, maiores, qui blanditiis ipsum.
        </p>
      </div>
    </section>
    <section class="section section--services">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="sur-titre sur-titre--sombre">Pour les habitants</p>
            <h2>Lorem ipsum dolor sit amet..</h2>
          </div>
          <span class="mention-page"><MapPin :size="15" /> Lubumbashi · Haut-Katanga</span>
        </div>
        <div class="grille-services grille-services--page">
          <article v-for="service in services" :key="service.titre" class="carte-service">
            <span class="carte-service__icone"><component :is="service.icone" :size="21" /></span>
            <span class="carte-service__titre">{{ service.titre }}</span>
            <span class="carte-service__description">{{ service.description }}</span>
            <ArrowRight class="carte-service__fleche" :size="18" />
          </article>
        </div>
        <div class="encart-information">
          <ShieldCheck :size="22" />
          <div>
            <strong>Protection des données</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, quaerat.
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
