<script setup lang="ts">
import AuthLayout from '~/layouts/auth.vue'
import { Form, Link } from '@adonisjs/inertia/vue'
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <AuthLayout>
    <Head title="Inscription — Espace municipal" />
    <p class="auth__eyebrow">Accès professionnel</p>
    <h1 class="auth__title">Créer votre espace.</h1>
    <p class="auth__sub">
      Les comptes sont destinés aux agents et responsables habilités par la mairie.
    </p>

    <Form v-slot="{ processing, errors }" route="new_account.store">
      <p v-if="Object.keys(errors).length" class="auth__resume-erreur" role="alert">
        Vérifiez les informations indiquées pour continuer.
      </p>
      <div class="auth__form">
        <div class="field">
          <label class="field__label" for="fullName">Nom complet</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            class="field__input"
            autocomplete="name"
            placeholder="Nom et prénom"
            required
            aria-required="true"
            :aria-describedby="errors.fullName ? 'erreur-nom-complet' : undefined"
            :aria-invalid="errors.fullName ? 'true' : 'false'"
          />
          <span v-if="errors.fullName" id="erreur-nom-complet" class="field__error" role="alert">{{
            errors.fullName
          }}</span>
        </div>

        <div class="field">
          <label class="field__label" for="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            class="field__input"
            autocomplete="email"
            placeholder="agent@mairie-lubumbashi.cd"
            required
            aria-required="true"
            :aria-describedby="errors.email ? 'erreur-email-inscription' : undefined"
            :aria-invalid="errors.email ? 'true' : 'false'"
          />
          <span
            v-if="errors.email"
            id="erreur-email-inscription"
            class="field__error"
            role="alert"
            >{{ errors.email }}</span
          >
        </div>

        <div class="field">
          <label class="field__label" for="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            class="field__input"
            autocomplete="new-password"
            placeholder="••••••••"
            required
            aria-required="true"
            :aria-describedby="errors.password ? 'erreur-mot-de-passe-inscription' : undefined"
            :aria-invalid="errors.password ? 'true' : 'false'"
          />
          <span
            v-if="errors.password"
            id="erreur-mot-de-passe-inscription"
            class="field__error"
            role="alert"
            >{{ errors.password }}</span
          >
        </div>

        <div class="field">
          <label class="field__label" for="passwordConfirmation">Confirmer le mot de passe</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            class="field__input"
            autocomplete="new-password"
            placeholder="••••••••"
            required
            aria-required="true"
            :aria-describedby="errors.passwordConfirmation ? 'erreur-confirmation' : undefined"
            :aria-invalid="errors.passwordConfirmation ? 'true' : 'false'"
          />
          <span
            v-if="errors.passwordConfirmation"
            id="erreur-confirmation"
            class="field__error"
            role="alert"
          >
            {{ errors.passwordConfirmation }}
          </span>
        </div>

        <button
          type="submit"
          class="btn btn--primary btn--block auth__submit"
          :disabled="processing"
          :style="{ marginTop: '4px' }"
        >
          {{ processing ? 'Inscription...' : "S'inscrire" }}
        </button>
      </div>
    </Form>

    <p class="auth__foot">
      Vous avez déjà un compte ?
      <Link route="session.create" class="il">Connectez-vous</Link>
    </p>
  </AuthLayout>
</template>
