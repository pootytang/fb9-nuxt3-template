export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', 
    [
      '@pinia/nuxt', {
        autoImports: ['defineStore']
      }
    ],
     
  ],
  runtimeConfig: {
    // The private keys which are only available within server-side
    FIREBASE_API_KEY: process.env.FB_API_KEY,
    // Keys within public, will be also exposed to the client-side
    public: {
      FB_API_KEY: process.env.FB_API_KEY,
      FB_APP_ID: process.env.FB_APP_ID,
    }
  }
})
