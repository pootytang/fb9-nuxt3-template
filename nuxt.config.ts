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
      FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
      FB_PROJECT_ID: process.env.FB_PROJECT_ID,
      FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
      FB_MESSAGE_SENDER_ID: process.env.FB_MESSAGE_SENDER_ID,
    }
  }
})
