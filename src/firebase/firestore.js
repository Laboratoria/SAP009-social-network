import {
  doc,
  deleteDoc,
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';

import { async } from 'regenerator-runtime';

import { app } from './firebase.js';

const db = getFirestore(app);

export const salvarPost = async (date, id, text, username) =>
  addDoc(collection(db, 'posts'), {
    date,
    id,
    like: [],
    text,
    username,
  });

export const pegarPost = async () => {
  const mensage = [];
  const order = query(collection(db, 'posts'), orderBy('date', 'desc'));
  const snapShot = await getDocs(order);
  snapShot.forEach((item) => {
    const data = item.data();
    data.id = item.id;
    data.date = data.date.toDate().toLocaleDateString();
    mensage.push(data);
  });
  return mensage;
};

export const deletarPost = (postId) => {
  deleteDoc(doc(db, 'posts', postId));
};
