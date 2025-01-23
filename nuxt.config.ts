// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxt/content"
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',

    }
  },

  ssr: false,

  primevue: {
    importTheme: {from: '~/themes/theme.js'}
},

  i18n: {
    locales: [
      {
        code: "ka",
        name: "GEO",
        flag: "🇬🇪",
        file: "ka.json",
      },
      {
        code: "en",
        name: "ENG",
        flag: "🇬🇧",
        file: "en.json",
      },
    ],
    strategy: "no_prefix",
    defaultLocale: "ka",
  }

});
