import { useUserStore } from '~~/stores/userStore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const firebaseConfig = {
    apiKey: config.FB_API_KEY,
    appId: config.FB_APP_ID,
    // authDomain: config.FB_AUTH_DOMAIN,
    // projectId: config.env.FB_PROJECT_ID,
    // storageBucket: config.env.FB_STORAGE_BUCKET,
    // messagingSenderId: config.env.FB_MESSAGE_SENDER_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // initUser() // Defined in useFirebase.ts composable
  userStore.monitorUser()

  // Provide getAuth to the rest of the app 
  //(not sure why we need to make it available to the vueapp as well as the nuxt app)
  const fbAuth = getAuth(app)
  nuxtApp.vueApp.provide('fbAuth', fbAuth)
  nuxtApp.provide('fbAuth', fbAuth)
})