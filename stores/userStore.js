import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut, 
  signInWithRedirect} from "firebase/auth";

export const useUserStore = defineStore('user',{
  state: () => ({
    user: null,
    peopleWhoOweMe: [],
    peopleIOwe: [],
    authError: {
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
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("userStore.registerUser() --> Registration Successful");
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authError.status = true
            this.authError.message = 'EMAIL ALREADY EXISTS'
            break
          case 'auth/invalid-email':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authError.status = true
            this.authError.message = 'INVALID EMAIL'
            break
          case 'auth/operation-not-allowed':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authError.status = true
            this.authError.message = 'OPERATION NOT ALLOWED'
            break
          case 'auth/weak-password':
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authError.status = true
            this.authError.message = 'WEAK PASSWORD'
            break
          default:
            console.log(`userStore.registerUser()--> Error code: ${error}`)
            this.authError = 'PROBLEM AUTHENTICATING'
        }
      }

      // this.user = auth.currentUser // Don't think I need this becasue onAuthStateChanged should fire setting the user
    },

    async signInUserWithEmail(email, password) {
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, email, password)
        this.authError.status = false
        this.authError.message = 'SUCCESS'
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            this.authError.status = true
            this.authError.message = 'USER NOT FOUND'
            break
          case 'auth/wrong-password':
            this.authError.status = true
            this.authError.message = 'INVALID PASSWORD'
            break
          default:
            this.authError.status = true
            this.authError.message = 'PROBLEM AUTHENTICATING'
        }
      }
    },

    async signInWithGoogle() {
      console.log('userStore.signInWithGoogle() --> Called')
      const provider = new GoogleAuthProvider();
      console.log('userStore.signInWithGoogle() --> PROVIDER:')
      console.table(provider)
      const auth = getAuth()
      console.table(auth)
      try {
        const result = await signInWithPopup(auth, provider)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            this.authError.status = true
            this.authError.message = 'USER NOT FOUND'
            break
          case 'auth/wrong-password':
            this.authError.status = true
            this.authError.message = 'INVALID PASSWORD'
            break
          default:
            this.authError.status = true
            this.authError.message = 'PROBLEM AUTHENTICATING'
        }
      }
    },

    async signUserOut() {
      const auth = getAuth()
      await signOut(auth)
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