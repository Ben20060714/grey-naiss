import './css/app.css'
import 'vue-sonner/style.css'
import { client } from '~/client'
import { createInertiaApp } from '@inertiajs/vue3'
import { TuyauProvider } from '@adonisjs/inertia/vue'
import { createApp, type DefineComponent, h } from 'vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const nomApplication = import.meta.env.VITE_APP_NAME || 'Mairie de Lubumbashi'

// Le mode sombre est désactivé pour cette version : le site reste en mode clair.
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'light')
}

createInertiaApp({
  title: (title) => (title ? `${title} - ${nomApplication}` : nomApplication),
  resolve: (name) => {
    return resolvePageComponent(
      `./pages/${name}.vue`,
      import.meta.glob<DefineComponent>('./pages/**/*.vue')
    )
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(TuyauProvider, { client }, { default: () => h(App, props) }) })
      .use(plugin)
      .mount(el)
  },
  progress: {
    color: '#4B5563',
  },
})
