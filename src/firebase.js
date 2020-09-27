import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAE5JluQ0WddYrUbzkiYio7qfe4lsNmerY",
  authDomain: "clone-laplana.firebaseapp.com",
  databaseURL: "https://clone-laplana.firebaseio.com",
  projectId: "clone-laplana",
  storageBucket: "clone-laplana.appspot.com",
  messagingSenderId: "593915521855",
  appId: "1:593915521855:web:928af73577cdc68e54818a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };