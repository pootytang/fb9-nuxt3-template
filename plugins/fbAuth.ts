import { initializeApp } from "firebase/app";


export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const firebaseConfig = {
    apiKey: config.FB_API_KEY,
    appId: config.FB_APP_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
})