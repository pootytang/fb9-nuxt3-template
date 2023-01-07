export const useUserStore = defineStore('user',{
  state: () => ({
    user: {},
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
    }
  }
})