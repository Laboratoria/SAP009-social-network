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
    updateDateTime: '',
    likes: [1],
  };
  // grava o post com o UID na collection posts independente de users
  const docReference = await addDoc(collection(db, 'posts'), post);
  console.log(docReference);
  post.id = docReference.id;
  return post;
};

export const updatePost = async (title, textPost, postId) => {
  console.log('edit');
  // grava o post com o UID na collection posts independente de users
  await updateDoc(doc(db, 'posts', postId), {
    title,
    textPost,
    updateDateTime: new Date().toLocaleTimeString([], {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }),

  });
  return true;
  
  console.log('afterdocreference-beforeconseoledocreference');
 
  // const docReference = await addDoc(collection(db, 'users',
  // auth.currentUser.uid, 'posts'), post);
  // post.id = teste.id;
};

  
  export const deletePost = async (postId) => {
    console.log('delete');
    // grava o post com o UID na collection posts independente de users
    const docReference = doc(db, 'posts', postId);
    await deleteDoc(docReference);
    console.log('delete completed');
 
  };
  
  // const docReference = await addDoc(collection(db, 'users',
  // auth.currentUser.uid, 'posts'), post);
  // post.id = teste.id;


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

export const getAllUsersPosts = async () => {
  const allPostsCollection = await getDocs(collection(db, 'posts'));
  // grava na collection posts dentro da collection users
  // await getDocs(collection(db, 'posts', auth.currentUser.uid, 'posts'));
  // console.log(allPostsCollection);
  const allPosts = [];
  allPostsCollection.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    allPosts.push(data);
  });
  return allPosts;
};
