import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.FB_API_KEY,
    appId: config.FB_APP_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  initUser()

  // Provide getAuth to the rest of the app 
  //(not sure why we need to make it available to the vueapp as well as the nuxt app)
  const fbAuth = getAuth()
  nuxtApp.vueApp.provide('fbAuth', fbAuth)
  nuxtApp.provide('fbAuth', fbAuth)
})