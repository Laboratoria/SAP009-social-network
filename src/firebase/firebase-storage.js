import {
  getFirestore, collection, addDoc,
  getDocs, onSnapshot,
} from 'firebase/firestore';

const db = getFirestore();

export function paraPostar(descricao) {
  addDoc(collection(db, 'postagens'), { descricao });
}

export function mostraPostagens() { // vai na memoria pega cada arq existente
  return getDocs(collection(db, 'postagens'));
}

export function quandoDadosForemAdicionados(postsEnviados) {
  onSnapshot(collection(db, 'postagens'), postsEnviados);
}
