import {
  getFirestore, collection, addDoc, getDocs, onSnapshot,
  deleteDoc, doc, getDoc, updateDoc, query, orderBy, // arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { dadosUsuaria } from './firebase-auth';
import { app } from './firebase.config.js';

// const auth = getAuth(app);

const db = getFirestore(app);

export function paraPostar(descricao) { // armazena no firebase
  const usuaria = dadosUsuaria();
  // console.log(usuaria);
  addDoc(collection(db, 'postagens'), { descricao, ...usuaria });
}

export function postagens() { // vai na memoria pega cada arq existente
  return getDocs(collection(db, 'postagens'));
} // a ordena posts substituiu ela pq retorna as postagens já ordenadas

export function mostraPostAutomaticamente(postEnviado) {
  return onSnapshot(collection(db, 'postagens'), postEnviado);
}

export function deletaPost(id) {
  return deleteDoc(doc(db, 'postagens', id)); // passar manualmente
}

export function editaPost(id) {
  return getDoc(doc(db, 'postagens', id));
}

export function atualizaEdicao(id, texto) {
  updateDoc(doc(db, 'postagens', id), texto);
}

export async function curtirPost(id, curtidas) {
  await updateDoc(doc(db, 'postagens', id), {
    curtidas: curtidas + 1,
  });
  // curtidas + 1 });

  // para usar  arrayUnion em curtidas tem que ter [] e vai poder curtir infinito
}
export async function descurtirPost(id, curtidas) {
  await updateDoc(doc(db, 'postagens', id), { curtidas: curtidas - 1 });
}

export async function ordenaPosts() {
  const ordem = query(collection(db, 'postagens'), orderBy('dataPostagem', 'desc'));
  const paraOrdenar = await getDocs(ordem);

  return paraOrdenar;
}
