import { getDocs, collection, addDoc } from 'firebase/firestore';

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
  console.log(docReference);
  // const docReference = await addDoc(collection(db, 'users',
  // auth.currentUser.uid, 'posts'), post);
  // post.id = teste.id;
  post.id = docReference.id;
  console.log(post);
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
