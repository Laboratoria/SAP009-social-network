import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc,
} from 'firebase/firestore';
import { app } from './firebase.config.js';

const auth = getAuth(app);
const db = getFirestore(app);

export function paraPostar(descricao) {
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
  getDoc(doc(db, 'postagens', id));
}

// export const obterNomeUsuaria = async () => {
//   const idUsuaria = await getDoc(doc(db, 'usuarias', auth.currentUser.uid));
//   console.log(idUsuaria);
//   const usuaria = {
//     uid: auth.currentUser.uid,
//     displayName: auth.currentUser.displayName,
//     email: idUsuaria.data().email,
//     nome: idUsuaria.data().nome,
//   };
//   console.log(usuaria);
//   return usuaria;
// };
