<script setup lang="ts">
import AuthLayout from '~/layouts/auth.vue'
import { Form, Link } from '@adonisjs/inertia/vue'
</script>

<template>
  <AuthLayout>
    <h1 class="auth__title">Accès professionnel</h1>
    <p class="auth__sub">Connectez-vous à votre espace d’état civil.</p>

    <Form v-slot="{ processing, errors }" route="session.store">
      <div class="auth__form">
        <div class="field">
          <label class="field__label" for="email">Adresse e-mail professionnelle</label>
          <input
            id="email"
            name="email"
            type="email"
            class="field__input"
            autocomplete="username"
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
            autocomplete="current-password"
            placeholder="••••••••"
            :aria-invalid="errors.password ? 'true' : 'false'"
          />
          <span v-if="errors.password" class="field__error">{{ errors.password }}</span>
        </div>

        <button
          type="submit"
          class="btn btn--primary btn--block"
          :disabled="processing"
          :style="{ marginTop: '4px' }"
        >
          {{ processing ? 'Connexion en cours…' : 'Se connecter' }}
        </button>
      </div>
    </Form>

    <p class="auth__foot">
      Vous n’avez pas encore de compte ?
      <Link route="new_account.create" class="il">Demander un accès</Link>
    </p>
  </AuthLayout>
</template>
