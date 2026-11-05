<script setup lang="ts">
import { Check, ChevronDown, CircleAlert, FileText, Save, Trash2, Upload } from 'lucide-vue-next'
import { computed, onMounted, reactive, ref } from 'vue'

type DonneesDeclaration = {
  prenomEnfant: string
  nomEnfant: string
  dateNaissance: string
  lieuNaissance: string
  sexeEnfant: string
  prenomMere: string
  nomMere: string
  identifiantMere: string
  prenomPere: string
  nomPere: string
  identifiantPere: string
  prenomDeclarant: string
  nomDeclarant: string
  lienDeclarant: string
  numeroPiece: string
  referenceMedicale: string
  nomDocument: string
}

const cleBrouillon = 'mairie-brouillon-naissance'
const donnees = reactive<DonneesDeclaration>({
  prenomEnfant: '',
  nomEnfant: '',
  dateNaissance: '',
  lieuNaissance: '',
  sexeEnfant: '',
  prenomMere: '',
  nomMere: '',
  identifiantMere: '',
  prenomPere: '',
  nomPere: '',
  identifiantPere: '',
  prenomDeclarant: '',
  nomDeclarant: '',
  lienDeclarant: '',
  numeroPiece: '',
  referenceMedicale: '',
  nomDocument: '',
})
const erreurs = ref<Partial<Record<keyof DonneesDeclaration, string>>>({})
const messageBrouillon = ref('')
const declarationLocale = ref(false)
const sectionOuverte = ref(1)

const dateMaximale = computed(() => new Date().toISOString().slice(0, 10))
const progression = computed(() => {
  const champs = [
    'prenomEnfant',
    'nomEnfant',
    'dateNaissance',
    'lieuNaissance',
    'sexeEnfant',
    'prenomMere',
    'nomMere',
    'prenomDeclarant',
    'nomDeclarant',
    'lienDeclarant',
  ]
  return Math.round(
    (champs.filter((champ) => donnees[champ as keyof DonneesDeclaration]).length / champs.length) *
      100
  )
})

onMounted(() => {
  const brouillon = localStorage.getItem(cleBrouillon)
  if (!brouillon) return
  Object.assign(donnees, JSON.parse(brouillon) as Partial<DonneesDeclaration>)
  messageBrouillon.value = 'Votre brouillon local a été restauré.'
})

function sauvegarderBrouillon() {
  localStorage.setItem(cleBrouillon, JSON.stringify(donnees))
  messageBrouillon.value = 'Brouillon enregistré sur cet appareil.'
  declarationLocale.value = false
}

function supprimerBrouillon() {
  localStorage.removeItem(cleBrouillon)
  Object.keys(donnees).forEach((champ) => {
    donnees[champ as keyof DonneesDeclaration] = ''
  })
  erreurs.value = {}
  messageBrouillon.value = 'Le brouillon local a été supprimé.'
  declarationLocale.value = false
}

function validerFormulaire() {
  const nouvellesErreurs: Partial<Record<keyof DonneesDeclaration, string>> = {}
  const champsObligatoires: Array<[keyof DonneesDeclaration, string]> = [
    ['prenomEnfant', 'Le prénom de l’enfant est obligatoire.'],
    ['nomEnfant', 'Le nom de l’enfant est obligatoire.'],
    ['dateNaissance', 'La date de naissance est obligatoire.'],
    ['lieuNaissance', 'Le lieu de naissance est obligatoire.'],
    ['sexeEnfant', 'Le sexe de l’enfant est obligatoire.'],
    ['prenomMere', 'Le prénom de la mère est obligatoire.'],
    ['nomMere', 'Le nom de la mère est obligatoire.'],
    ['prenomDeclarant', 'Le prénom du déclarant est obligatoire.'],
    ['nomDeclarant', 'Le nom du déclarant est obligatoire.'],
    ['lienDeclarant', 'Le lien avec l’enfant est obligatoire.'],
  ]
  champsObligatoires.forEach(([champ, message]) => {
    if (!donnees[champ]) nouvellesErreurs[champ] = message
  })
  if (donnees.dateNaissance && donnees.dateNaissance > dateMaximale.value)
    nouvellesErreurs.dateNaissance = 'La date ne peut pas être dans le futur.'
  erreurs.value = nouvellesErreurs
  if (Object.keys(nouvellesErreurs).length) {
    sectionOuverte.value = 1
    return
  }
  sauvegarderBrouillon()
  declarationLocale.value = true
  messageBrouillon.value = ''
}

function choisirDocument(event: Event) {
  const champFichier = event.target as HTMLInputElement
  donnees.nomDocument = champFichier.files?.[0]?.name ?? ''
}
</script>

<template>
  <form class="formulaire-declaration" novalidate @submit.prevent="validerFormulaire">
    <div class="formulaire-entete">
      <div>
        <p class="sur-titre sur-titre--sombre">Dossier local</p>
        <h2>Déclaration de naissance</h2>
      </div>
      <div class="progression-formulaire">
        <span
          ><strong>{{ progression }}%</strong> complété</span
        >
        <div><i :style="{ width: progression + '%' }" /></div>
      </div>
    </div>
    <div v-if="declarationLocale" class="alerte-formulaire alerte-formulaire--succes" role="status">
      <Check :size="18" /><span
        >Le dossier est prêt. Il est conservé localement et n’a pas été transmis à un serveur.</span
      >
    </div>
    <div v-if="messageBrouillon" class="message-brouillon" role="status">
      <Save :size="15" /> {{ messageBrouillon }}
    </div>

    <section class="bloc-formulaire" :class="{ 'bloc-formulaire--ouvert': sectionOuverte === 1 }">
      <button
        class="bloc-formulaire__titre"
        type="button"
        :aria-expanded="sectionOuverte === 1"
        aria-controls="contenu-section-1"
        @click="sectionOuverte = sectionOuverte === 1 ? 0 : 1"
      >
        <span class="numero-section">01</span
        ><span><strong>Enfant</strong><small>Identité et naissance</small></span
        ><ChevronDown :size="19" />
      </button>
      <div v-show="sectionOuverte === 1" id="contenu-section-1" class="bloc-formulaire__contenu">
        <div class="grille-champs grille-champs--deux">
          <label
            class="champ-formulaire"
            :class="{ 'champ-formulaire--erreur': erreurs.prenomEnfant }"
            ><span>Prénom <b>*</b></span
            ><input
              v-model.trim="donnees.prenomEnfant"
              type="text"
              autocomplete="given-name"
              placeholder="Prénom de l’enfant"
            /><small v-if="erreurs.prenomEnfant">{{ erreurs.prenomEnfant }}</small></label
          ><label
            class="champ-formulaire"
            :class="{ 'champ-formulaire--erreur': erreurs.nomEnfant }"
            ><span>Nom <b>*</b></span
            ><input
              v-model.trim="donnees.nomEnfant"
              type="text"
              autocomplete="family-name"
              placeholder="Nom de l’enfant"
            /><small v-if="erreurs.nomEnfant">{{ erreurs.nomEnfant }}</small></label
          >
        </div>
        <div class="grille-champs grille-champs--trois">
          <label
            class="champ-formulaire"
            :class="{ 'champ-formulaire--erreur': erreurs.dateNaissance }"
            ><span>Date de naissance <b>*</b></span
            ><input v-model="donnees.dateNaissance" type="date" :max="dateMaximale" /><small
              v-if="erreurs.dateNaissance"
              >{{ erreurs.dateNaissance }}</small
            ></label
          ><label
            class="champ-formulaire"
            :class="{ 'champ-formulaire--erreur': erreurs.lieuNaissance }"
            ><span>Lieu de naissance <b>*</b></span
            ><input
              v-model.trim="donnees.lieuNaissance"
              type="text"
              placeholder="Commune ou maternité"
            /><small v-if="erreurs.lieuNaissance">{{ erreurs.lieuNaissance }}</small></label
          ><label
            class="champ-formulaire"
            :class="{ 'champ-formulaire--erreur': erreurs.sexeEnfant }"
            ><span>Sexe <b>*</b></span
            ><select v-model="donnees.sexeEnfant">
              <option value="" disabled>Sélectionner</option>
              <option value="F">Féminin</option>
              <option value="M">Masculin</option>
              <option value="I">Non renseigné</option></select
            ><small v-if="erreurs.sexeEnfant">{{ erreurs.sexeEnfant }}</small></label
          >
        </div>
      </div>
    </section>
    <section
      v-for="section in [
        { numero: 2, titre: 'Mère', sousTitre: 'Identité et identifiant national' },
        { numero: 3, titre: 'Père', sousTitre: 'Identité et identifiant national' },
        { numero: 4, titre: 'Déclarant', sousTitre: 'Personne à l’origine de la déclaration' },
        { numero: 5, titre: 'Preuve médicale', sousTitre: 'Justificatif de naissance' },
        { numero: 6, titre: 'Validation', sousTitre: 'Vérification avant enregistrement' },
      ]"
      :key="section.numero"
      class="bloc-formulaire"
      :class="{ 'bloc-formulaire--ouvert': sectionOuverte === section.numero }"
    >
      <button
        class="bloc-formulaire__titre"
        type="button"
        :aria-expanded="sectionOuverte === section.numero"
        :aria-controls="'contenu-section-' + section.numero"
        @click="sectionOuverte = sectionOuverte === section.numero ? 0 : section.numero"
      >
        <span class="numero-section">0{{ section.numero }}</span
        ><span
          ><strong>{{ section.titre }}</strong
          ><small>{{ section.sousTitre }}</small></span
        ><ChevronDown :size="19" />
      </button>
      <div
        v-show="sectionOuverte === section.numero"
        :id="'contenu-section-' + section.numero"
        class="bloc-formulaire__contenu"
      >
        <template v-if="section.numero === 2"
          ><div class="grille-champs grille-champs--deux">
            <label
              class="champ-formulaire"
              :class="{ 'champ-formulaire--erreur': erreurs.prenomMere }"
              ><span>Prénom de la mère <b>*</b></span
              ><input v-model.trim="donnees.prenomMere" type="text" /><small
                v-if="erreurs.prenomMere"
                >{{ erreurs.prenomMere }}</small
              ></label
            ><label
              class="champ-formulaire"
              :class="{ 'champ-formulaire--erreur': erreurs.nomMere }"
              ><span>Nom de la mère <b>*</b></span
              ><input v-model.trim="donnees.nomMere" type="text" /><small v-if="erreurs.nomMere">{{
                erreurs.nomMere
              }}</small></label
            >
          </div>
          <label class="champ-formulaire"
            ><span>Identifiant national RDC-Pass <i>facultatif</i></span
            ><input
              v-model.trim="donnees.identifiantMere"
              type="text"
              placeholder="Ex. RDC-0000-0000" /></label
        ></template>
        <template v-else-if="section.numero === 3"
          ><div class="grille-champs grille-champs--deux">
            <label class="champ-formulaire"
              ><span>Prénom du père</span
              ><input v-model.trim="donnees.prenomPere" type="text" /></label
            ><label class="champ-formulaire"
              ><span>Nom du père</span><input v-model.trim="donnees.nomPere" type="text"
            /></label>
          </div>
          <label class="champ-formulaire"
            ><span>Identifiant national RDC-Pass <i>facultatif</i></span
            ><input
              v-model.trim="donnees.identifiantPere"
              type="text"
              placeholder="Ex. RDC-0000-0000" /></label
        ></template>
        <template v-else-if="section.numero === 4"
          ><div class="grille-champs grille-champs--trois">
            <label
              class="champ-formulaire"
              :class="{ 'champ-formulaire--erreur': erreurs.prenomDeclarant }"
              ><span>Prénom <b>*</b></span
              ><input v-model.trim="donnees.prenomDeclarant" type="text" /><small
                v-if="erreurs.prenomDeclarant"
                >{{ erreurs.prenomDeclarant }}</small
              ></label
            ><label
              class="champ-formulaire"
              :class="{ 'champ-formulaire--erreur': erreurs.nomDeclarant }"
              ><span>Nom <b>*</b></span
              ><input v-model.trim="donnees.nomDeclarant" type="text" /><small
                v-if="erreurs.nomDeclarant"
                >{{ erreurs.nomDeclarant }}</small
              ></label
            ><label
              class="champ-formulaire"
              :class="{ 'champ-formulaire--erreur': erreurs.lienDeclarant }"
              ><span>Lien avec l’enfant <b>*</b></span
              ><select v-model="donnees.lienDeclarant">
                <option value="" disabled>Sélectionner</option>
                <option value="parent">Parent</option>
                <option value="proche">Proche</option>
                <option value="agent">Agent habilité</option></select
              ><small v-if="erreurs.lienDeclarant">{{ erreurs.lienDeclarant }}</small></label
            >
          </div>
          <label class="champ-formulaire"
            ><span>Numéro de pièce <i>facultatif</i></span
            ><input v-model.trim="donnees.numeroPiece" type="text" /></label
        ></template>
        <template v-else-if="section.numero === 5"
          ><div class="grille-champs grille-champs--deux">
            <label class="champ-formulaire"
              ><span>Référence médicale <i>facultatif</i></span
              ><input
                v-model.trim="donnees.referenceMedicale"
                type="text"
                placeholder="Référence du certificat" /></label
            ><label class="champ-formulaire"
              ><span>Justificatif <i>facultatif</i></span
              ><span class="zone-televersement"
                ><Upload :size="18" /><span>{{ donnees.nomDocument || 'Choisir un document' }}</span
                ><input type="file" accept=".pdf,.jpg,.jpeg,.png" @change="choisirDocument" /></span
            ></label>
          </div>
          <p class="aide-formulaire">
            <FileText :size="15" /> Le document est uniquement référencé dans le brouillon local.
          </p></template
        >
        <template v-else
          ><div class="resume-declaration">
            <p><strong>Vérifiez les informations saisies</strong></p>
            <span
              >{{ donnees.prenomEnfant || 'Prénom' }} {{ donnees.nomEnfant || 'Nom' }} ·
              {{ donnees.dateNaissance || 'Date non renseignée' }}</span
            ><span>Mère : {{ donnees.prenomMere || 'Non renseigné' }} {{ donnees.nomMere }}</span
            ><span
              >Déclarant : {{ donnees.prenomDeclarant || 'Non renseigné' }}
              {{ donnees.nomDeclarant }}</span
            >
          </div>
          <div
            v-if="Object.keys(erreurs).length"
            class="alerte-formulaire alerte-formulaire--erreur"
          >
            <CircleAlert :size="18" /> Certains champs obligatoires doivent être complétés.
          </div></template
        >
      </div>
    </section>
    <div class="actions-formulaire">
      <button class="bouton bouton--secondaire" type="button" @click="supprimerBrouillon">
        <Trash2 :size="16" /> Effacer le brouillon</button
      ><button class="bouton bouton--secondaire" type="button" @click="sauvegarderBrouillon">
        <Save :size="16" /> Enregistrer localement</button
      ><button class="bouton bouton--sombre" type="submit">
        Valider localement <Check :size="17" />
      </button>
    </div>
    <p class="note-securite">
      Aucune donnée ne quitte ce navigateur. La transmission au serveur n’est pas activée dans cette
      version frontend.
    </p>
  </form>
</template>
