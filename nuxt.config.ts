// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})