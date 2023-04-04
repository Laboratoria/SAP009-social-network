import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc, updateDoc, deleteDoc, query, orderBy, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { getAppAuth } from './auth';
import { app } from './app';

const db = getFirestore(app);

export const createPost = (anime, episodes, description) => { //eslint-disable-line
  const auth = getAppAuth();
  return addDoc(collection(db, 'posts'), {
    name: auth.currentUser.displayName,
    author: auth.currentUser.uid,
    anime,
    episodes,
    description,
    createdAt: new Date(),
    likes: [],
    whoLiked: [],
  });
};

export async function accessPost() {
  const allPosts = [];
  const postQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(postQuery);
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

export async function deletePost(postId) {
  const docRef = doc(db, 'posts', postId);
  return deleteDoc(docRef);
}

export function likePost(postId, userId) {
  updateDoc(doc(db, 'posts', postId), {
    whoLiked: arrayUnion(userId),
  });
}

export function deslikePost(postId, userId) {
  updateDoc(doc(db, 'posts', postId), {
    whoLiked: arrayRemove(userId),
  });
}
