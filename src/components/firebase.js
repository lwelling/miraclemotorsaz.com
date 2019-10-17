import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'


const config = {
    apiKey: "AIzaSyBvzmXRls4a7zDUYzVcSDrpfcdSUvsLpNQ",
    authDomain: "miracle-motors.firebaseapp.com",
    databaseURL: "https://miracle-motors.firebaseio.com",
    projectId: "miracle-motors",
    storageBucket: "miracle-motors.appspot.com",
    messagingSenderId: "628999281147",
    appId: "1:628999281147:web:5acae5b920cd9f5c10935e",
    measurementId: "G-JJ1NWHFN25"
  };


  class Firebase {
      constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.db = app.firestore()
      }

      login(email, password) {
          return this.auth.signInWithEmailAndPassword(email, password)
      }

      logout() {
          return this.auth.signOut()
      }

      async register(name, email, password) {
          await this.auth.createUserWithEmailAndPassword(email, password)
          return this.auth.currentUser.updateProfile({
              displayName: name
          })
      }

      addWish({ wish }) {
        if(!this.auth.currentUser) {
            return alert('Not authorized')
        }
        
        return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
            wish
        })
    }

    isInitialized() {
        return new Promise( resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    async getCurrentUserWish() {
        if(!this.auth.currentUser) {
            return null
        }
        const wish = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
        return wish.get('wish')
    }
  }

  export default new Firebase()
