/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars, import/order, object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc,
} from 'firebase/firestore';
import { app } from './firebase.config.js';

const auth = getAuth(app);
const db = getFirestore(app);

// Firebase Authentication

export function criarCadastro(email, password, displayName) {
  return createUserWithEmailAndPassword(auth, email, password).then((usuaria) => updateProfile(usuaria.user, { displayName }));
}

export function fazerLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function observador(callback) { // verifica se tem usuário logado ou não
  onAuthStateChanged(auth, callback);
}

export function verificarEmail(){
  return sendEmailVerification(auth.currentUser)
    .then(() => {
    // Email verification sent!
    // eslint-disable-next-line indent
    })
    .catch((error) => {
      console.log(error);
    });
}

export function loginComGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function sair() {
  return signOut(auth).then(() => {
    // saiu
  }).catch((error) => {
    console.log(error);
  });
}

export function nomeUsuaria() {
  const user = auth.currentUser;
  // console.log(user);
  if (user == null){
    return 'Usuária';
  }
  return user.displayName;
}

export const obterUsuaria = () => {
  const uid = auth.currentUser.user.uid;
  const usuarioRef = getDoc(doc(db, 'usuarias', uid));
  const usuaria = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    email: usuarioRef.data().email,
    nomeUsuaria: usuarioRef.data().nomeUsuaria,
  };

  return usuaria;
};

// FIRESTORE

export function paraPostar(descricao) { // armazena no firebase
  addDoc(collection(db, 'postagens'), { descricao });
}

export function postagens() { // vai na memoria pega cada arq existente
  return getDocs(collection(db, 'postagens'));
}

export function mostraPostAutomaticamente(postEnviado) {
  return onSnapshot(collection(db, 'postagens'), postEnviado);
}

export function deletaPost(id) {
  return deleteDoc(doc(db, 'postagens', id));
}

export function editaPost(id) {
  return getDoc(doc(db, 'postagens', id));
}