import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc,
} from 'firebase/firestore';
import { app } from './firebase.config.js';

// const auth = getAuth(app);
const db = getFirestore(app);

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
