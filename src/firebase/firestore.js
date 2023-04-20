import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  // deleteDoc,
} from 'firebase/firestore';

import { app } from './configuration.js';
// import { update } from 'lodash';

const auth = getAuth(app);

const db = getFirestore(app);

async function newPost(textpost) {
  const currentDate = new Date();
  const createPosts = {
    userId: auth.currentUser.uid,
    username: auth.currentUser.displayName,
    date: currentDate,
    post: textpost,
    likes: [],
  };
  const docRef = await addDoc(collection(db, 'posts'), createPosts);
  createPosts.id = docRef.id;
  return createPosts;
}

const getUserData = () => auth.currentUser;

async function findPosts(showPosts) {
  const queryOrder = query(collection(db, 'posts'), orderBy('date', 'desc'));
  onSnapshot(queryOrder, (querySnapshot) => {
    querySnapshot.forEach((post) => {
      showPosts({ ...post.data(), postId: post.id });
    });
  });
}
async function likePosts(postId, userId) {
  await updateDoc(doc(db, 'posts', postId), {
    likes: arrayUnion(userId),
  });
}
async function dislikePosts(postId, userId) {
  await updateDoc(doc(db, 'posts', postId), {
    likes: arrayRemove(userId),
  });
}

async function editPost(postId, editContent) {
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('pt-BR');
  await updateDoc(doc(db, 'posts', postId), {
    post: editContent,
    editDate: dateString,
  });
}

export {
  newPost,
  getUserData,
  findPosts,
  likePosts,
  dislikePosts,
  editPost,
};
