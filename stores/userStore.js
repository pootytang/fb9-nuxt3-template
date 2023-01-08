import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const useUserStore = defineStore('user',{
  state: () => ({
    user: null,
    peopleWhoOweMe: [],
    peopleIOwe: [],
    authError: false
  }),

  getters: {},

  actions: {
    async logOut() {
      console.log('userStore.logOut() - CALLED')
      const { auth }= useSupabaseClient()
      const { error } = await auth.signOut()
      if (error) {
        console.error(error)
        this.authError = true
        return this.authError
      }

      console.log('userStore.logOut() - No DB Error')
      try {
        await $fetch("/api/_supabase/session", {
          method: "POST",
          body: { event: "SIGNED_OUT", session: null},
        })
        console.log('userStore.logOut() - Supabase fix finished')
      } catch (error) {
        console.error(error)
        this.authError = true
        return this.authError
      }
      this.$reset()
    },

    async registerUser() {

    },

    async signInUserWithEmail() {

    },

    async monitorUser() {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log('userStore.onAuthStateChanged --> user is signed in')
        } else {
          console.log('userStore.onAuthStateChanged --> user is signed out')
        }
    
        this.user = user
      });
    },
  }
})