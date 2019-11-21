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
    this.provider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // async signInWithFacebook(props) {
  //   try {
  //     await this.auth.signInWithPopup(this.facebookProvider);
  //     this.createWishList(`${this.auth.currentUser.uid}`);
  //     props.history.replace("/dashboard");
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  // async checkFacebookLoginState() {
  //   await FB.getLoginStatus(function(response) {
  //     statusChangeCallback(response);
  //   });
  // }

  async signInWithGoogle(props) {
    try {
      // await this.auth.signInWithRedirect(this.provider);
      await this.auth.signInWithPopup(this.provider);
      this.createWishList(`${this.auth.currentUser.uid}`);
      props.history.replace("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  async registerWithEmail(props, displayName, email, password) {
    if (!!email && !!displayName && !!password) {
      try {
        await this.auth.createUserWithEmailAndPassword(email, password);
        this.createWishList(`${this.auth.currentUser.uid}`);
        this.auth.currentUser.updateProfile({
          displayName
        });
        props.history.replace("/dashboard");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please fill out form entirely");
    }
  }

  // updatePhoneNumber(phoneNumber) {
  //   try {
  //     this.auth.currentUser.updatePhoneNumber({
  //       phoneNumber
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout(props) {
    await this.auth.signOut();
    props.history.push("/");
  }

  createWishList(uid) {
    const ref = this.db.collection("wishLists").doc(uid);
    ref.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        return null;
      } else {
        ref.set({
          listItems: [],
          owner: `/users/${uid}`
        });
      }
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
      .then(success => success)
      .catch(err => console.error("error: ", err));
  }

  async updatePhoneNumber(phoneNumber) {
    const uid = `${this.auth.currentUser.uid}`;
    await this.db
      .collection("users")
      .doc(uid)
      .get()
      .then(() => {
        this.db
          .collection("users")
          .doc(uid)
          .set({
            phoneNumber
          });
      });
  }

  getPhoneNumber() {
    const uid = `${this.auth.currentUser.uid}`;
    this.db
      .collection("users")
      .doc(uid)
      .get()
      .then(dataSnapshot => {
        if (dataSnapshot.exists) {
          const number = dataSnapshot.data().phoneNumber 
          return number
        } else {
          return null
        }
      });
  }

  async updateWishList(newVehicle, currentIdx) {
    await this.deleteFromWishList(currentIdx);
    const ref = await this.db.doc(`wishLists/${this.auth.currentUser.uid}`);
    const existingWishes = await ref
      .get()
      .then(doc => doc.data())
      .then(list => list.listItems);
    let newWishes = [...existingWishes];
    newWishes.splice(currentIdx, 0, newVehicle);
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
    return this.auth.currentUser.displayName;
  }

  getCurrentUserObject() {
    return this.auth.currentUser;
  }

  checkAuthStatus() {
    const user = this.auth.currentUser;
    if (user) {
      return true;
    } else {
      return null;
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
    return list;
  }

  async getWishListRef() {
    if (!this.auth.currentUser) {
      return null;
    }
    const wishListRef = await this.db
      .doc(`users/${this.auth.currentUser.uid}`)
      .get()
      .then(doc => doc.data().wishListRef);
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
      .then(() => {})
      .catch(err => console.error("error: ", err));
  }
}

export default new Firebase();
