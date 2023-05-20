// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getFirestore, collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBKEntE-vS_bMj9GTLbYIunAxwNcU9iHy8',
  authDomain: 'connectcurly.firebaseapp.com',
  projectId: 'connectcurly',
  storageBucket: 'connectcurly.appspot.com',
  messagingSenderId: '411967281125',
  appId: '1:411967281125:web:0f487b88288d99cb2f810c',
  measurementId: 'G-1B7BWEQWZC',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export function addPost(date, post, username) {
  return addDoc(collection(db, 'posts'), {
    date,
    post,
    username,
  });
}

export async function printPost() {
  const q = query(collection(db, 'posts'));
  return new Promise((resolve, reject) => {
    onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((post) => {
        // eslint-disable-next-line max-len
        posts.push({ ...post.data(), id: post.id }); // copiar as informações do objeto e adicionar o id
      });
      resolve(posts);
    }, reject);
  });
}

export function deletePost(postId) {
  return deleteDoc(doc(db, 'posts', postId));
}

export function editPost(postId, newPostData) {
  const postRef = doc(db, 'posts', postId);
  return updateDoc(postRef, newPostData);
}
