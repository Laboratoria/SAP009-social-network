import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
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
    likes: [],
  });

  // newPost.id = docRef.id;
  // return newPost;
  const doc = await getDoc(docRef);
  console.log(doc.data().textArea);
  return doc;
}

export async function postsNaTela() {
  const novoArray = [];
  const q = query(collection(db, 'post'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  /* const dados = doc.data();
    dados.id = doc.id; */
    novoArray.push(doc);
  });
  console.log(novoArray);
  return novoArray;
}

/* export const likePost = async (postId, idUser) => updateDoc(doc(db, 'post', postId), {
  likes: arrayUnion('idUser'),

}); */

const getPost = async (postId) => {
  const ref = doc(db, 'post', postId);
  const result = await getDoc(ref);
  return result.data();
};
export const likePost = async (postId, idUser) => {
  const post = await getPost(postId, idUser);
};
