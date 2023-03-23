import { getDocs, collection, addDoc } from 'firebase/firestore';

import { db } from './firestore.js';

import { auth } from '../firebase/auth';

export const createNewPost = async (textPost) => {
  const post = {
    uid: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    title: textPost,
    message: 'fabicon',

  };
  // grava o post com o UID na collection posts independente de users
  // const docReference = await addDoc(collection(db, 'posts'), post);
  const docReference = await addDoc(collection(db, 'users', auth.currentUser.uid, 'posts'), post);
  //post.id = teste.id;
   post.id = docReference.id;
  return post;
};

export const getLoggedUserAllPosts = async () => {
  const postsCollection = await getDocs(collection(db, 'users', auth.currentUser.uid, 'posts'));
  const posts = [];
  postsCollection.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    posts.push(data);
  });
  console.log(posts);
  return posts;
};
