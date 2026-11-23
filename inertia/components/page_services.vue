<script setup lang="ts">
import { ArrowRight, FileText, MapPin, QrCode, Search, ShieldCheck, Users } from 'lucide-vue-next'

const services = [
  {
    titre: 'Déclarer une naissance',
    description: 'Comprendre les étapes, les pièces à préparer et le délai de 90 jours.',
    icone: FileText,
    lien: '/?page=contact',
  },
  {
    titre: 'Retrouver un service d’état civil',
    description: 'Identifier le bureau ou la maternité selon votre démarche.',
    icone: Search,
    lien: '/?page=contact',
  },
  {
    titre: 'Vie locale et associative',
    description:
      'Accéder aux informations utiles sur les initiatives et équipements de Lubumbashi.',
    icone: Users,
    lien: '/?page=actualites',
  },
  {
    titre: 'Vérifier un acte de naissance',
    description:
      'La vérification par QR code sera disponible lorsque le service central sera activé.',
    icone: QrCode,
    lien: '/?page=contact',
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
          Retrouvez les démarches, les informations d’état civil et les services utiles aux
          habitants.
        </p>
      </div>
    </section>
    <section class="section section--services">
      <div class="conteneur">
        <div class="entete-section">
          <div>
            <p class="sur-titre sur-titre--sombre">Pour les habitants</p>
            <h2>Des services pour vos démarches.</h2>
          </div>
          <span class="mention-page"><MapPin :size="15" /> Lubumbashi · Haut-Katanga</span>
        </div>
        <div class="grille-services grille-services--page">
          <a
            v-for="service in services"
            :key="service.titre"
            :href="service.lien"
            class="carte-service"
          >
            <span class="carte-service__icone"><component :is="service.icone" :size="21" /></span>
            <span class="carte-service__titre">{{ service.titre }}</span>
            <span class="carte-service__description">{{ service.description }}</span>
            <ArrowRight class="carte-service__fleche" :size="18" />
          </a>
        </div>
        <div class="encart-information">
          <ShieldCheck :size="22" />
          <div>
            <strong>Protection des données</strong>
            <p>
              Les informations sensibles sont traitées uniquement dans l’espace prévu à cet effet.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
