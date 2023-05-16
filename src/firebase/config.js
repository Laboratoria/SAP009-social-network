// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getFirestore, collection, addDoc, query, onSnapshot,
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
  const posts = [];
  await onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
  });
  return posts;
}

// criar template de cada post (foreach)
