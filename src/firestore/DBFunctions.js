import { getDocs, collection, addDoc } from 'firebase/firestore';

import { db } from './firestore.js';

import { auth } from '../firebase/auth';

export const createNewPost = async (textPost) => {
  const post = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    title: 'vendo guitarra',
    textPost,
    dateTime: '2023-03-24 00:08',
    updateDateTime: '',
    likes: [1],
  };
  // grava o post com o UID na collection posts independente de users
  const docReference = await addDoc(collection(db, 'posts'), post);
  // const docReference = await addDoc(collection(db, 'users',
  // auth.currentUser.uid, 'posts'), post);
  // post.id = teste.id;
  post.id = docReference.id;
  return post;
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
