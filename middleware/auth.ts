export default defineNuxtRouteMiddleware((to, from) => {
  // if (to.path.includes("home")) {
  //   const user = useSupabaseUser()
  //   if (user.value) {
  //     return
  //   }
  //   console.log(user)
  //   console.warn('auth - Need authentication to access page');
    
  //   return navigateTo("/login")
  // }

  // If the user is not logged in, abort navigation
  const  { $fbAuth } = useNuxtApp()
  console.log(`Auth Route Guard Current user: ${$fbAuth.currentUser}`)
  if (!$fbAuth?.currentUser?.uid) {
    return abortNavigation()
  }
})