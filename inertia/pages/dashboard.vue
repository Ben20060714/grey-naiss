<script setup lang="ts">
import { Activity, CloudOff, FilePlus2, ShieldAlert } from 'lucide-vue-next'
import FormulaireDeclaration from '~/components/formulaire_declaration.vue'
import Page from '~/components/page.vue'
import AppLayout from '~/layouts/app.vue'
</script>

<template>
  <AppLayout>
    <Page
      title="Nouvelle déclaration de naissance"
      description="Saisissez les informations du dossier. Vos données restent enregistrées uniquement sur cet appareil."
    >
      <template #actions>
        <span class="etiquette-locale"><FilePlus2 :size="15" /> Brouillon local</span>
      </template>
      <div class="tableau-agent">
        <article class="indicateur-agent">
          <span class="indicateur-agent__icone"><FilePlus2 :size="18" /></span
          ><span>Déclarations aujourd’hui</span><strong>Local</strong>
        </article>
        <article class="indicateur-agent">
          <span class="indicateur-agent__icone"><Activity :size="18" /></span
          ><span>Dossiers en attente</span><strong>Non disponible</strong>
        </article>
        <article class="indicateur-agent">
          <span class="indicateur-agent__icone"><ShieldAlert :size="18" /></span
          ><span>Correspondances à vérifier</span><strong>Non disponible</strong>
        </article>
        <article class="indicateur-agent indicateur-agent--hors-ligne">
          <span class="indicateur-agent__icone"><CloudOff :size="18" /></span
          ><span>État de synchronisation</span><strong>Local uniquement</strong>
        </article>
      </div>
      <FormulaireDeclaration />
    </Page>
  </AppLayout>
</template>
