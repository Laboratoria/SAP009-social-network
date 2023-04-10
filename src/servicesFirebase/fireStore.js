import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore';

import {
  firebaseConfig,
} from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Armazenar conta do usuário//

export async function userData(nome, email, uid) {
  await addDoc(collection(db, 'users'), {
    displayName: nome,
    email,
    uid,
  });
}

// criar post//
export async function newPost(dataPostagem, id, post, username) {
  await addDoc(collection(db, 'post'), {
    date: dataPostagem,
    idUser: id,
    textArea: post,
    userName: username,
  });
}
