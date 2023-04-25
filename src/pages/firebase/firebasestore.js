<<<<<<< HEAD
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "./firebase.js";
import { async } from "regenerator-runtime";
=======
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { app } from './firebase.js';
<<<<<<< HEAD
import { async } from 'regenerator-runtime';
>>>>>>> 20a0622341f6f30a95a738dcaedcbf3524474721
=======
// import { async } from 'regenerator-runtime';
>>>>>>> 315beecf9ed824886f832eb17f5c3026ecdb14ba

const db = getFirestore(app);

export const newPost = async (text, date, username, id) => addDoc(collection(db, 'Post'), {
  username,
  date,
  text,
  id,
  like: 0,
});

export const getPost = async () => {
  const message = [];
  const order = query(collection(db, 'Post'), orderBy('date', 'desc'));
  const snapshot = await getDocs(order);
  snapshot.forEach((item) => {
    const data = item.data();
    const dataTime = data.date;
    data.id = item.id;
    data.date = dataTime.toDate().toLocaleDateString();
    data.hour = dataTime.toDate().toLocaleTimeString();

    message.push(data);
  });
  return message;
};

export const deletePost =  async (postId) => {
  deleteDoc(doc(db, 'Post', postId));
};

// edit
// like/deslike
// excluir
// update
