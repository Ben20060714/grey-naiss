<script setup lang="ts">
import AuthLayout from '~/layouts/auth.vue'
import { Form, Link } from '@adonisjs/inertia/vue'
import { Head } from '@inertiajs/vue3'
</script>

<template>
  <AuthLayout>
    <Head title="Connexion — Espace municipal" />
    <p class="auth__eyebrow">Espace municipal</p>
    <h1 class="auth__title">Bienvenue dans votre espace.</h1>
    <p class="auth__sub">
      Connectez-vous pour retrouver les outils d’état civil qui vous sont autorisés.
    </p>

    <Form v-slot="{ processing, errors }" route="session.store">
      <p v-if="Object.keys(errors).length" class="auth__resume-erreur" role="alert">
        Vérifiez les informations indiquées pour continuer.
      </p>
      <div class="auth__form">
        <div class="field">
          <label class="field__label" for="email">Adresse e-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            class="field__input"
            autocomplete="username"
            placeholder="agent@mairie-lubumbashi.cd"
            required
            aria-required="true"
            :aria-describedby="errors.email ? 'erreur-email' : undefined"
            :aria-invalid="errors.email ? 'true' : 'false'"
          />
          <span v-if="errors.email" id="erreur-email" class="field__error" role="alert">{{
            errors.email
          }}</span>
        </div>

        <div class="field">
          <label class="field__label" for="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            class="field__input"
            autocomplete="current-password"
            placeholder="••••••••"
            required
            aria-required="true"
            :aria-describedby="errors.password ? 'erreur-mot-de-passe' : undefined"
            :aria-invalid="errors.password ? 'true' : 'false'"
          />
          <span v-if="errors.password" id="erreur-mot-de-passe" class="field__error" role="alert">{{
            errors.password
          }}</span>
        </div>

        <button
          type="submit"
          class="btn btn--primary btn--block auth__submit"
          :disabled="processing"
          :style="{ marginTop: '4px' }"
        >
          {{ processing ? 'Connexion en cours…' : 'Se connecter' }}
        </button>
      </div>
    </Form>

    <p class="auth__foot">
      Vous n’avez pas encore de compte ?
      <Link route="new_account.create" class="il">Créez-en un</Link>
    </p>
  </AuthLayout>
</template>
