<script setup lang="ts">
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  MapPin,
  Phone,
  QrCode,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-vue-next'
import { gsap } from 'gsap'
import { defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import MarketingLayout from '~/layouts/marketing.vue'
import PageChargement from '~/components/page_chargement.vue'
import PageErreur from '~/components/page_erreur.vue'
// import imageLubumbashi from '~/assets/lubumbashi-hero.svg'

const PageActualites = defineAsyncComponent({
  loader: () => import('~/components/page_actualites.vue'),
  loadingComponent: PageChargement,
  errorComponent: PageErreur,
  delay: 0,
  timeout: 10000,
})
const PageContact = defineAsyncComponent({
  loader: () => import('~/components/page_contact.vue'),
  loadingComponent: PageChargement,
  errorComponent: PageErreur,
  delay: 0,
  timeout: 10000,
})
const PageServices = defineAsyncComponent({
  loader: () => import('~/components/page_services.vue'),
  loadingComponent: PageChargement,
  errorComponent: PageErreur,
  delay: 0,
  timeout: 10000,
})

type Service = { titre: string; description: string; icone: typeof FileText; ancre: string }
type Actualite = { date: string; categorie: string; titre: string; description: string }
type Evenement = { mois: string; jour: string; titre: string; lieu: string; heure: string }
type PagePublique = 'accueil' | 'services' | 'actualites' | 'contact'

function determinerPageInitiale(): PagePublique {
  if (typeof window === 'undefined') return 'accueil'
  const pageDemandee = new URLSearchParams(window.location.search).get('page')
  return ['services', 'actualites', 'contact'].includes(pageDemandee ?? '')
    ? (pageDemandee as Exclude<PagePublique, 'accueil'>)
    : 'accueil'
}

const pageActuelle = ref<PagePublique>(determinerPageInitiale())
const conteneurPage = ref<HTMLElement | null>(null)
const dureeTransition = 0.38
let clePageAnimee = ''

function reduireLesAnimations() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function animerContenuPage(element: Element) {
  const elements = element.querySelectorAll(
    '.accueil-hero__texte, .accueil-hero__repere, .carte-service, .carte-actualite, .evenement'
  )
  if (!elements.length) return

  const clePage = pageActuelle.value ?? 'chargement'
  if (clePage === clePageAnimee) return
  clePageAnimee = clePage

  if (reduireLesAnimations()) {
    gsap.set(elements, { clearProps: 'opacity,transform' })
    return
  }

  gsap.fromTo(
    elements,
    { opacity: 0, y: 12 },
    {
      opacity: 1,
      y: 0,
      clearProps: 'opacity,transform',
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.06,
    }
  )
}

function entrerPage(element: Element, terminer: () => void) {
  gsap.killTweensOf(element)
  if (reduireLesAnimations()) {
    gsap.set(element, { clearProps: 'opacity,transform' })
    animerContenuPage(element)
    terminer()
    return
  }

  gsap.fromTo(
    element,
    { opacity: 0.88, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: dureeTransition,
      ease: 'power2.out',
      clearProps: 'opacity,transform',
      onComplete: () => {
        animerContenuPage(element)
        terminer()
      },
    }
  )
}

function sortirPage(element: Element, terminer: () => void) {
  gsap.killTweensOf(element)
  if (reduireLesAnimations()) {
    terminer()
    return
  }

  gsap.to(element, {
    opacity: 0.96,
    y: -12,
    duration: dureeTransition,
    ease: 'power2.in',
    clearProps: 'opacity,transform',
    onComplete: terminer,
  })
}

const services: Service[] = [
  {
    titre: 'État civil',
    description: 'Actes, naissance, mariage et démarches.',
    icone: FileText,
    ancre: '/?page=services',
  },
  {
    titre: 'Démarches en ligne',
    description: 'Retrouvez les formulaires et les informations utiles.',
    icone: Search,
    ancre: '/?page=services',
  },
  {
    titre: 'Vie associative',
    description: 'Associations, équipements et initiatives citoyennes.',
    icone: Users,
    ancre: '/?page=actualites',
  },
  {
    titre: 'Signaler un problème',
    description: 'Une rue, un éclairage ou un espace public à nous signaler.',
    icone: ShieldCheck,
    ancre: '/?page=contact',
  },
]

const actualites: Actualite[] = [
  {
    date: '12 juin 2025',
    categorie: 'Vie municipale',
    titre: 'La ville présente son nouveau plan de mobilité',
    description: 'Découvrez les aménagements prévus pour faciliter les déplacements de chacun.',
  },
  {
    date: '06 juin 2025',
    categorie: 'Cadre de vie',
    titre: 'Les inscriptions aux activités d’été sont ouvertes',
    description: 'Un programme d’activités pour les enfants, les jeunes et les familles.',
  },
  {
    date: '28 mai 2025',
    categorie: 'Solidarité',
    titre: 'Une permanence sociale au plus près des habitants',
    description: 'La mairie renforce son accompagnement avec des permanences sur rendez-vous.',
  },
]

const evenements: Evenement[] = [
  {
    mois: 'JUIN',
    jour: '21',
    titre: 'Fête de la musique',
    lieu: 'Place de la mairie',
    heure: '19:00',
  },
  {
    mois: 'JUIN',
    jour: '28',
    titre: 'Conseil municipal',
    lieu: 'Salle des délibérations',
    heure: '18:30',
  },
  {
    mois: 'JUIL.',
    jour: '05',
    titre: 'Marché des producteurs',
    lieu: 'Place du marché',
    heure: '08:00',
  },
]

function lirePage() {
  const pageDemandee = new URLSearchParams(window.location.search).get('page')
  pageActuelle.value = ['services', 'actualites', 'contact'].includes(pageDemandee ?? '')
    ? (pageDemandee as Exclude<PagePublique, 'accueil'>)
    : 'accueil'
}

function intercepterNavigation(evenement: MouseEvent) {
  const cible = evenement.target
  if (!(cible instanceof Element)) return

  const lien = cible.closest<HTMLAnchorElement>('a[href]')
  if (
    !lien ||
    lien.target === '_blank' ||
    evenement.defaultPrevented ||
    evenement.button !== 0 ||
    evenement.metaKey ||
    evenement.ctrlKey ||
    evenement.shiftKey ||
    evenement.altKey
  ) {
    return
  }

  const url = new URL(lien.href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname !== '/') {
    return
  }

  evenement.preventDefault()
  if (url.href !== window.location.href) {
    window.history.pushState({}, '', url)
    lirePage()
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  lirePage()
  window.addEventListener('popstate', lirePage)
  window.addEventListener('click', intercepterNavigation)
})

onUpdated(() => {
  // Une page asynchrone peut remplacer le composant de chargement après la transition.
  nextTick(() => {
    if (conteneurPage.value) animerContenuPage(conteneurPage.value)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', lirePage)
  window.removeEventListener('click', intercepterNavigation)
  if (conteneurPage.value) {
    gsap.killTweensOf(conteneurPage.value)
  }
})
</script>

<template>
  <MarketingLayout>
    <Transition :css="false" appear mode="out-in" @enter="entrerPage" @leave="sortirPage">
      <div ref="conteneurPage" :key="pageActuelle">
        <main v-if="pageActuelle === 'accueil'">
          <section class="accueil-hero" aria-labelledby="titre-principal">
            <div class="conteneur accueil-hero__contenu">
              <div class="accueil-hero__texte">
                <p class="sur-titre"><span class="point-vivant" /> Site officiel de la ville</p>
                <h1 id="titre-principal">Lubumbashi,<br /><em>à vos côtés.</em></h1>
                <p class="accueil-hero__description">
                  Retrouvez vos services municipaux, les actualités de la ville et toutes les
                  informations utiles au quotidien.
                </p>
                <div class="accueil-hero__actions">
                  <a class="bouton bouton--clair" href="/?page=services"
                    >Accéder aux démarches <ArrowRight :size="17"
                  /></a>
                  <a class="lien-discret" href="/?page=contact"
                    >Nous contacter <ChevronRight :size="16"
                  /></a>
                </div>
              </div>
              <div class="accueil-hero__repere">
                <!--
                <figure class="accueil-hero__visuel">
                  <img
                    :src="imageLubumbashi"
                    alt="Illustration de Lubumbashi au lever du jour"
                    width="900"
                    height="760"
                    fetchpriority="high"
                  />
                  <figcaption>Lubumbashi · Haut-Katanga</figcaption>
                </figure>
                -->
                <div class="repere-carte">
                  <span class="repere-carte__marqueur"><MapPin :size="21" /></span>
                  <div>
                    <span class="repere-carte__etiquette">Mairie de Lubumbashi</span
                    ><strong>Accueil municipal</strong><span>Horaires à consulter</span>
                  </div>
                  <div class="repere-carte__ligne" />
                  <div class="repere-carte__coordonnees">
                    <span><Phone :size="14" /> Coordonnées officielles</span
                    ><span><MapPin :size="14" /> Lubumbashi, Haut-Katanga</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="accueil-hero__vague" aria-hidden="true" />
          </section>

          <section id="services" class="section section--services" aria-labelledby="titre-services">
            <div class="conteneur">
              <div class="entete-section">
                <div>
                  <p class="sur-titre sur-titre--sombre">À votre service</p>
                  <h2 id="titre-services">Les démarches les plus demandées</h2>
                </div>
                <a class="lien-souligne" href="/?page=services"
                  >Voir tous les services <ArrowRight :size="16"
                /></a>
              </div>
              <div class="grille-services">
                <a
                  v-for="service in services"
                  :key="service.titre"
                  class="carte-service"
                  :href="service.ancre"
                  ><span class="carte-service__icone"
                    ><component :is="service.icone" :size="21" /></span
                  ><span class="carte-service__titre">{{ service.titre }}</span
                  ><span class="carte-service__description">{{ service.description }}</span
                  ><ArrowRight class="carte-service__fleche" :size="18"
                /></a>
              </div>
            </div>
          </section>

          <section
            id="vie-locale"
            class="section section--actualites"
            aria-labelledby="titre-actualites"
          >
            <div class="conteneur">
              <div class="entete-section">
                <div>
                  <p class="sur-titre sur-titre--sombre">La vie de la commune</p>
                  <h2 id="titre-actualites">Actualités de la ville</h2>
                </div>
                <a class="lien-souligne" href="/?page=actualites"
                  >Toutes les actualités <ArrowRight :size="16"
                /></a>
              </div>
              <div class="grille-actualites">
                <article
                  v-for="actualite in actualites"
                  :key="actualite.titre"
                  class="carte-actualite"
                >
                  <div class="carte-actualite__image" aria-hidden="true">
                    <span>{{ actualite.categorie.slice(0, 1) }}</span>
                  </div>
                  <div class="carte-actualite__contenu">
                    <p class="carte-actualite__meta">
                      {{ actualite.categorie }} · {{ actualite.date }}
                    </p>
                    <h3>{{ actualite.titre }}</h3>
                    <p>{{ actualite.description }}</p>
                    <a class="lien-souligne" href="/?page=actualites"
                      >Lire la suite <ArrowRight :size="15"
                    /></a>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section
            id="verification"
            class="section section--verification"
            aria-labelledby="titre-verification"
          >
            <div class="conteneur verification-publique">
              <div class="verification-publique__icone"><QrCode :size="28" /></div>
              <div>
                <p class="sur-titre sur-titre--sombre">Service public</p>
                <h2 id="titre-verification">Vérifier un acte de naissance</h2>
                <p>
                  Un acte portant un QR code pourra être vérifié avec sa référence. Les informations
                  personnelles ne sont jamais affichées dans le QR code.
                </p>
              </div>
              <div class="verification-publique__etat">
                <span class="point-etat" /> Service de vérification en préparation
              </div>
            </div>
          </section>

          <section class="section section--agenda" aria-labelledby="titre-agenda">
            <div class="conteneur agenda">
              <div class="agenda__intro">
                <p class="sur-titre sur-titre--clair">À noter dans vos agendas</p>
                <h2 id="titre-agenda">Les prochains<br /><em>rendez-vous.</em></h2>
                <p>
                  Conseils, rencontres et événements : la ville vous donne rendez-vous toute
                  l’année.
                </p>
                <a class="bouton bouton--clair" href="/?page=actualites"
                  >Voir l’agenda <CalendarDays :size="17"
                /></a>
              </div>
              <div class="liste-evenements">
                <article v-for="evenement in evenements" :key="evenement.titre" class="evenement">
                  <div class="evenement__date">
                    <span>{{ evenement.mois }}</span
                    ><strong>{{ evenement.jour }}</strong>
                  </div>
                  <div class="evenement__details">
                    <h3>{{ evenement.titre }}</h3>
                    <span><MapPin :size="14" /> {{ evenement.lieu }}</span>
                  </div>
                  <span class="evenement__heure"><Clock3 :size="15" /> {{ evenement.heure }}</span>
                </article>
              </div>
            </div>
          </section>

          <section id="contact" class="section section--contact" aria-labelledby="titre-contact">
            <div class="conteneur contact">
              <div>
                <p class="sur-titre sur-titre--sombre">Une question ?</p>
                <h2 id="titre-contact">La mairie vous répond.</h2>
              </div>
              <div class="contact__infos">
                <p>Accueil de l’hôtel de ville</p>
                <strong>Accueil municipal</strong
                ><span>Les coordonnées seront publiées par la mairie.</span>
              </div>
              <a class="bouton bouton--sombre" href="/?page=services"
                >Voir les services publics <ArrowRight :size="17"
              /></a>
            </div>
          </section>
        </main>
        <PageServices v-else-if="pageActuelle === 'services'" />
        <PageActualites v-else-if="pageActuelle === 'actualites'" />
        <PageContact v-else />
      </div>
    </Transition>
  </MarketingLayout>
</template>
