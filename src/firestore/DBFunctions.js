/* eslint-disable no-use-before-define */
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
    dateTime: new Date().toLocaleTimeString([], {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }),
    updateDateTime: new Date().toLocaleTimeString([], {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }),
    likes: [1],
    timestamp: new Date().getTime(),
  };

  const docReference = await addDoc(collection(db, 'posts'), post);
  post.id = docReference.id;
  return getAllUsersPosts();
};

export const updatePost = async (title, textPost, postId) => {
  await updateDoc(doc(db, 'posts', postId), {
    title,
    textPost,
    updateDateTime: new Date().toLocaleTimeString([], {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }),
    timestamp: new Date().getTime(),
  });
  return getAllUsersPosts();
};

export const deletePost = async (postId) => {
  const docReference = doc(db, 'posts', postId);
  await deleteDoc(docReference);
};

// const docReference = await addDoc(collection(db, 'users',
// auth.currentUser.uid, 'posts'), post);
// post.id = teste.id;

export const getLoggedUserAllPosts = async () => {
  const postsCollection = await getDocs(collection(db, 'posts'));
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

export const getAllUsersPosts = async () => {
  const allPostsCollection = await getDocs(collection(db, 'posts'));
  const allPosts = [];
  allPostsCollection.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    allPosts.push(data);
  });
  console.log(allPosts);
  return allPosts;
};
