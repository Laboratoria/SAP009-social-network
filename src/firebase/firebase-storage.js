import {
  getFirestore, collection, addDoc, getDocs, onSnapshot,
  deleteDoc, doc, getDoc, updateDoc, query, orderBy,
} from 'firebase/firestore';
import { dadosUsuaria } from './firebase-auth';
import { app } from './firebase.config.js';

// const auth = getAuth(app);

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

export function curtirPost(id, curtidas) {
  updateDoc(doc(db, 'postagens', id), { curtidas: curtidas + 1 });
}

// export function somaCurtidas

export async function ordenaPosts() {
  const postsOrdenados = [];
  const ordem = query(collection(db, 'postagens'), orderBy('dataPostagem', 'asc'));
  const paraOrdenar = await getDocs(ordem);
  paraOrdenar.forEach((post) => {
    const dados = post.data();
    dados.id = post.id;
    postsOrdenados.push(dados);
  });

  return postsOrdenados;
}

const OP = ordenaPosts();
console.log(OP);
