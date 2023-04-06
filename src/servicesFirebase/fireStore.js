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

export async function userData(nome, email) {
  await addDoc(collection(db, 'users'), {
    displayName: nome,
    email,
  });
}

// criar post//
export async function newPost(post) {
  await addDoc(collection(db, 'post'), {
    textArea: post,
  });
}
