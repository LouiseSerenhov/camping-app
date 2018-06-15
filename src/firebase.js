import firebase from "firebase";

var config = {
    apiKey: "AIzaSyDn5M8gFk5ckDgXXH94bLSd_zvTy11l7M0",
    authDomain: "fun-food-friends-d0174.firebaseapp.com",
    databaseURL: "https://fun-food-friends-d0174.firebaseio.com",
    projectId: "fun-food-friends-d0174",
    storageBucket: "",
    messagingSenderId: "820233911568"
  };

  firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
 export default firebase;