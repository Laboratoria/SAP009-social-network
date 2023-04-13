import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  // onSnapshot,
  // orderBy,
  // updateDoc,
  // arrayUnion,
  // arrayRemove,
  // doc,
  // query,
  // getDocs,
  // deleteDoc,
} from 'firebase/firestore';

import { app } from './configuration.js';

const auth = getAuth(app);

const db = getFirestore(app);

export const userData = (name, username) => addDoc(collection(db, 'users'), {
  name,
  username,
});

export async function newPost(textpost) {
  const createPosts = {
    userId: auth.currentUser.uid,
    username: auth.currentUser.displayName,
    date: new Date(),
    post: textpost,
    likes: 0,
  };
  const docRef = await addDoc(collection(db, 'posts'), createPosts);
  createPosts.id = docRef.id;
  console.log(createPosts);
  return createPosts;
}
