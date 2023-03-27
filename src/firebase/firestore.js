import {
  getFirestore, addDoc, collection, getDocs, doc, updateDoc, deleteDoc,
} from 'firebase/firestore';
import { app } from './app';

const db = getFirestore(app);

export const createPost = (anime, episodes, description) => { //eslint-disable-line
  return addDoc(collection(db, 'posts'), {
    anime,
    episodes,
    description,
  });
};

export async function accessPost() {
  const allPosts = [];
  const querySnapshot = await getDocs(collection(db, 'posts'));
  querySnapshot.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    allPosts.push(data);
  });
  return allPosts;
}

export async function editPost(idPost, newPost) {
  const docRef = doc(db, 'posts', idPost);
  return updateDoc(docRef, newPost);
}

export async function deletePost(idPost) {
  const docRef = doc(db, 'posts', idPost);
  return deleteDoc(docRef);
}
