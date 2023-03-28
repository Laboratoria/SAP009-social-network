import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { async } from 'regenerator-runtime';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
    googleLogin: async () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        let result = await firebase.auth().signInWithPopup(provider);
        return results;

    };
};

const auth = getAuth();

export const criandoUsuário = createUserWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
});

export const loginComEmail = signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});

export const sair = signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});