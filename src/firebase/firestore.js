import {
  doc,
  deleteDoc,
  getFirestore,
  addDoc,
} from 'firebase/firestore';
import { app } from './firebase.js';

const salvarPost = (posText) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    posText: posText,
    likes: [],
    autor: 
  }
  )
}

const db = getFirestore(app);

export const deletarPost = async (postId) => {
  deleteDoc(doc(db, "posts", postId));
}
