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
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    this.createWishList(`${this.auth.currentUser.uid}`);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  async createWishList(uid) {
    await this.db
      .collection("wishLists")
      .doc(uid)
      .set({
        listItems: [],
        owner: `/users/${uid}`
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

  async addToWishList(newVehicle) {
    const ref = await this.db.doc(`wishLists/${this.auth.currentUser.uid}`);
    const existingWishes = await ref
      .get()
      .then(doc => doc.data())
      .then(list => list.listItems);
    const newWishes = [...existingWishes, newVehicle];
    await ref
      .update({ listItems: newWishes })
      .then(success => /* update wishlist UI here */ success)
      .catch(err => console.error("error: ", err));
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

  getCurrentUserObject() {
    return this.auth.currentUser
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
    const list = await this.db
      .doc(`/wishLists/${this.auth.currentUser.uid}`)
      .get()
      .then(doc => doc.data());
    console.log(list);
    return list;
  }

  async getWishListRef() {
    if (!this.auth.currentUser) {
      console.log("logged-out");
      return null;
    }
    const wishListRef = await this.db
      .doc(`users/${this.auth.currentUser.uid}`)
      .get()
      .then(doc => doc.data().wishListRef);
    console.log("logged-in");
    return wishListRef;
  }

  async deleteFromWishList(deleteThisCar) {
    const ref = await this.db.doc(`wishLists/${this.auth.currentUser.uid}`);
    let existingWishes = await ref
      .get()
      .then(doc => doc.data())
      .then(list => list.listItems);

    existingWishes.splice(deleteThisCar, 1);

    await ref
      .update({ listItems: existingWishes })
      .then(() => {
      })
      .catch(err => console.error("error: ", err));
  }
}

export default new Firebase();
