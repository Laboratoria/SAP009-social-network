import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
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
  const docRef = await addDoc(collection(db, 'post'), {
    date: dataPostagem,
    idUser: id,
    textArea: post,
    userName: username,
  });
  // newPost.id = docRef.id;
  // return newPost;
  return docRef.id;
}

const q = query(collection(db, 'post'));

export async function postsNaTela() {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}
