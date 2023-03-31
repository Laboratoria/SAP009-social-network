import {
  getDocs, collection, addDoc, updateDoc, doc, deleteDoc,
} from 'firebase/firestore';

import { db } from './firestore.js';

import { auth } from '../firebase/auth';

export const createNewPost = async (title, textPost) => {
  console.log('create');
  const post = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    title,
    textPost,
    dateTime: new Date().toLocaleString(),
    updateDateTime: '',
    likes: [1],
  };
  // grava o post com o UID na collection posts independente de users
  const docReference = await addDoc(collection(db, 'posts'), post);
  post.id = docReference.id;
  return post;
};

export const updatePost = async (title, textPost, postId) => {
  console.log('edit');
  // grava o post com o UID na collection posts independente de users
  const docReference = updateDoc(doc(db, 'posts', postId), {
    title,
    textPost,
    updateDateTime: new Date().toLocaleString(),
  });
  console.log(docReference);
  // const docReference = await addDoc(collection(db, 'users',
  // auth.currentUser.uid, 'posts'), post);
  // post.id = teste.id;
};

export const deletePost = async (postId) => {
  console.log('delete');
  // grava o post com o UID na collection posts independente de users
  const docReference = doc(db, 'posts', postId);
  await deleteDoc(docReference);
  // const docReference = await addDoc(collection(db, 'users',
  // auth.currentUser.uid, 'posts'), post);
  // post.id = teste.id;
};

export const getLoggedUserAllPosts = async () => {
  const postsCollection = await getDocs(collection(db, 'posts'));
  // grava na collection posts dentro da collection users
  // await getDocs(collection(db, 'posts', auth.currentUser.uid, 'posts'));
  // console.log(postsCollection);
  const posts = [];
  postsCollection.forEach((post) => {
    const data = post.data();
    if (data.uid === auth.currentUser.uid) {
      data.id = post.id;
      posts.push(data);
    }
  });
  return posts;
};
