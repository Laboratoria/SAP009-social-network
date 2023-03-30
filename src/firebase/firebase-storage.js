import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc,
} from 'firebase/firestore';
import { app } from './firebase.config.js';

const db = getFirestore(app);

export function paraPostar(descricao) {
  addDoc(collection(db, 'postagens'), { descricao });
}

export function postagens() { // vai na memoria pega cada arq existente
  return getDocs(collection(db, 'postagens'));
}

export function mostraPostAutomaticamente(postEnviado) {
  onSnapshot(collection(db, 'postagens'), postEnviado);
}

export function deletaPost(id) {
  deleteDoc(doc(db, 'postagens', id));
}
