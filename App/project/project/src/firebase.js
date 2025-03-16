// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC55g3ZM9LiNYtC7PRS-fnpFZnDAO0Nc9w",
  authDomain: "govmate-69869.firebaseapp.com",
  projectId: "govmate-69869",
  storageBucket: "govmate-69869.firebasestorage.app",
  messagingSenderId: "137943325261",
  appId: "1:137943325261:web:f17fdf6f2236b23a2a5a04",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink };