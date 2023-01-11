import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider} from "firebase/auth";

export const useUserStore = defineStore('user',{
  state: () => ({
    user: null,
    peopleWhoOweMe: [],
    peopleIOwe: [],
    notificationCount: 3,
    isPending: false,
    authResult: {
      status: false,
      message: ''
    }
  }),

  getters: {},

  actions: {
    async registerUser(email, password) {
      console.log(`userStore.registerUser() --> Called with ${email} and ${password}`);
      const auth = getAuth()
      try {
        this.isPending = true
        await createUserWithEmailAndPassword(auth, email, password)
        this.authResult.status = false
        this.authResult.message = 'SUCCESS'
        this.isPending = false
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authResult.status = true
            this.authResult.message = 'EMAIL ALREADY EXISTS'
            break
          case 'auth/invalid-email':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authResult.status = true
            this.authResult.message = 'INVALID EMAIL'
            break
          case 'auth/operation-not-allowed':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authResult.status = true
            this.authResult.message = 'OPERATION NOT ALLOWED'
            break
          case 'auth/weak-password':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authResult.status = true
            this.authResult.message = 'WEAK PASSWORD'
            break
          default:
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authResult = 'PROBLEM AUTHENTICATING'
        }
      }

      // onAuthStateChanged will fire setting the user so no need to do that here
      this.isPending = false
      return this.authResult
    },

    async signInUserWithEmail(email, password) {
      const auth = getAuth()
      try {
        this.isPending = true
        await signInWithEmailAndPassword(auth, email, password)
        this.authResult.status = false
        this.authResult.message = 'SUCCESS'
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            this.authResult.status = true
            this.authResult.message = 'USER NOT FOUND'
            break
          case 'auth/wrong-password':
            this.authResult.status = true
            this.authResult.message = 'INVALID PASSWORD'
            break
          default:
            this.authResult.status = true
            this.authResult.message = 'PROBLEM AUTHENTICATING'
        }
      }

      this.isPending = false
      return this.authResult
    },

    async signInWithSocialProvider(provider) {
      const auth = getAuth()

      switch (provider) {
        case 'google':
          provider = new GoogleAuthProvider()
          break
        case 'fb':
          provider = new FacebookAuthProvider()
          break
        case 'tw':
          provider = new TwitterAuthProvider()
          break
        case 'gh':
          provider = new GithubAuthProvider()
          break
        default:
          provider = ''
          console.error('provider not allowed')
      }

      console.log('userStore.signInWithSocialProvider() --> Provider set to:')
      console.table(provider)

      if (provider) {
        try {
          this.isPending = true
          const result = await signInWithPopup(auth, provider)
          this.authResult.status = false
          this.authResult.message = 'SUCCESS'
        } catch (error) {
          switch (error.code) {
            case 'auth/user-not-found':
              this.authResult.status = true
              this.authResult.message = 'USER NOT FOUND'
              break
            case 'auth/wrong-password':
              this.authResult.status = true
              this.authResult.message = 'INVALID PASSWORD'
              break
            case 'auth/account-exists-with-different-credential':
              this.authResult.status = true
              this.authResult.message = 'Account already exists with different provider. Try a different account'
              break
            default:
              console.error(`userStore.signInWithSocialProvider() --> Error: ${error.message}`)
              this.authResult.status = true
              this.authResult.message = 'PROBLEM AUTHENTICATING'
          }
        }
      } else {
        this.authResult.status = false
        this.authResult.message = 'provider not allowed'
      }
      

      this.isPending = false
      return this.authResult
    },

    async signUserOut() {
      console.log('userStore.signUserOut() --> Called')
      const auth = getAuth()
      this.isPending = true
      await signOut(auth)
      this.isPending = false
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