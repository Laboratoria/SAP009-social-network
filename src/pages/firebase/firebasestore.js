import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { app } from './firebase.js';
// import { async } from 'regenerator-runtime';

const db = getFirestore(app);

export const newPost = async (text, date, username, uid) => addDoc(collection(db, 'Post'), {
  username,
  date,
  text,
  uid,
  like: [],
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

export const likePost = async (postId, userId) => {
  updateDoc(doc(db, 'Post', postId), {
    like: arrayUnion(userId),
  });
};

export const unlikePost = async (postId, userId) => {
  updateDoc(doc(db, 'Post', postId), {
    like: arrayRemove(userId),
  });
};

export const editPost = (postId, textArea) => updateDoc(doc(db, 'Post', postId), {
  text: textArea,
});

export const deletePost = async (postId) => {
  deleteDoc(doc(db, 'Post', postId));
};
// edit
// like/deslike
// excluir
// update
