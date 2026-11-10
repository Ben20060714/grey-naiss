<script setup lang="ts">
import AuthLayout from '~/layouts/auth.vue'
import { Form, Link } from '@adonisjs/inertia/vue'
</script>

<template>
  <AuthLayout>
    <h1 class="auth__title">INSCRIPTION</h1>
    <!-- <p class="auth__sub">Créez votre compte professionnel pour accéder aux outils autorisés.</p> -->

    <Form v-slot="{ processing, errors }" route="new_account.store">
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
            :aria-invalid="errors.fullName ? 'true' : 'false'"
          />
          <span v-if="errors.fullName" class="field__error">{{ errors.fullName }}</span>
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
            :aria-invalid="errors.email ? 'true' : 'false'"
          />
          <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
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
            :aria-invalid="errors.password ? 'true' : 'false'"
          />
          <span v-if="errors.password" class="field__error">{{ errors.password }}</span>
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
            :aria-invalid="errors.passwordConfirmation ? 'true' : 'false'"
          />
          <span v-if="errors.passwordConfirmation" class="field__error">
            {{ errors.passwordConfirmation }}
          </span>
        </div>

        <button
          type="submit"
          class="btn btn--primary btn--block"
          :disabled="processing"
          :style="{ marginTop: '4px' }"
        >
          {{ processing ? 'Inscription...' : 'S\'inscrire' }}
        </button>
      </div>
    </Form>

    <p class="auth__foot">
      Vous avez déjà un compte ?
      <Link route="session.create" class="il">Connectez-vous</Link>
    </p>
  </AuthLayout>
</template>
