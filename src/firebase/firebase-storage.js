import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { dadosUsuaria } from './firebase';
import { app } from './firebase.config.js';

const auth = getAuth(app);

const db = getFirestore(app);

export function paraPostar(descricao) { // armazena no firebase
  const usuaria = dadosUsuaria();
  console.log(usuaria);
  addDoc(collection(db, 'postagens'), { descricao, ...usuaria });
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

export function atualizaEdicao(id, texto) {
  updateDoc(doc(db, 'postagens', id), texto);
}

export function nomeUsuaria() {
  const user = auth.currentUser;
  console.log(user);
  if (user == null) {
    return 'Usuária';
  }
  return user.displayName;
}
