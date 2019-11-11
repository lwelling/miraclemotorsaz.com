import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

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
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.state = {
      isAuth: false
    };
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  addPreference({ preference }) {
    return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
      preference
    });
  }

  updateProfile(name, email, preference) {
    return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
      name,
      email,
      preference
    });
  }

  addToWishList(newVehicle) {
    const { year, make, model, miles, price } = newVehicle;
    const wishListRef = this.db
      .collection("users")
      .doc(`${this.auth.currentUser.uid}`)
      .collection("wishList");

    wishListRef.add({
      year,
      make,
      model,
      miles,
      price
    });
  }

  updateEmailPreference() {
    return this.db.doc(`users/${this.auth.currentUser.uid}`).update({
      "preference.receiveInventory": true
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  checkAuthStatus() {
    const user = this.auth.currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async getCurrentEmailPreference() {
    if (!this.auth.currentUser) {
      return null;
    }
    const pref = await this.db.doc(`users/${this.auth.currentUser.uid}`).get();
    return pref.get("preference.receiveInventory");
  }

  defineUser() {
    const user = this.auth.currentUser;
    let name, email, uid;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;
      return `${name} ${email} ${uid}`;
    } else {
      return null;
    }
  }

  async getWishList() {
    const ref = await this.getWishListRef();
    const list = await this.db.doc(`/wishLists/${ref.id}`)
      .get()
      .then(doc => doc.data());
    return list;
  }

  async getWishListRef() {
    if (!this.auth.currentUser) {
      return null;
    }
    const wishListRef = await this.db
      .doc(`users/${this.auth.currentUser.uid}`)
      .get()
      .then(doc => doc.data().wishListRef)
    return wishListRef;
  }
}

export default new Firebase();
