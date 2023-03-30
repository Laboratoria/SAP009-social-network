import {
  getFirestore, collection, addDoc,
  getDocs, onSnapshot,
} from 'firebase/firestore';

const db = getFirestore(); // pq pega sem o app e com o app

export function paraPostar(descricao) {
  addDoc(collection(db, 'postagens'), { descricao });
}

export function postagens() { // vai na memoria pega cada arq existente
  return getDocs(collection(db, 'postagens'));
}

export function quandoDadosForemAdicionados(postEnviado) {
  onSnapshot(collection(db, 'postagens'), postEnviado);
}
