import {
  getFirestore,
  collection,
  deleteDoc,
  query,
  orderBy,
  addDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

import { app } from './firebase.js';

import { auth } from './login-firebase.js';
import { posts } from '../Pages/TimeLine/time.js';

const db = getFirestore(app);

export const getPosts = () => {
    const queryOrder = query(collection(db, 'posts'), orderBy('data', 'desc'));   
    onSnapshot(queryOrder, (querySnapshot) => {
      querySnapshot.forEach((item) => {
        const feed = item.data();
       posts(feed)
      });
    });   
  }
;



// Função que alimenta a coleção "posts" no Clound Firestore
export function creatPost(menssagem) {
  return addDoc(collection(db, 'posts'), {
    menssagem,
    data: new Date(),
    userName: auth.currentUser.displayName,
  }).then((docRef) => ({
    id: docRef.id,
  }));
}

// Função para deletar o post
export function deletePost(docId) {
  return deleteDoc(doc(db, 'posts', docId));
}

// Função para editar o post
export function editPost(id, menssagem) {
  const postRef = doc(db, 'posts', id);
  return updateDoc(postRef, {
    menssagem,
  });
}
