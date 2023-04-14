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

async function newPost(textpost) {
  const createPosts = {
    userId: auth.currentUser.uid,
    username: auth.currentUser.displayName,
    date: new Date(),
    post: textpost,
    likes: 0,
  };
  const docRef = await addDoc(collection(db, 'posts'), createPosts);
  createPosts.id = docRef.id;
  return createPosts;
}

const getUsername = () => auth.currentUser.displayName;

export {
  newPost,
  getUsername,
};
