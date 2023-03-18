/* eslint-disable no-console */
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseInit';

export const userData = (name, lastname) => addDoc(collection(db, 'infos-add'), {
  nome: name,
  sobrenome: lastname,
});

export const newPost = async (postagem, dataPostagem, username, id) => addDoc(collection(db, 'posts'), {
  userName: username,
  data: dataPostagem,
  post: postagem,
  idUser: id,
});

export const accessPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const messages = [];
  querySnapshot.forEach((item) => {
    const data = item.data();
    data.id = item.id;
    // console.log(data);
    // console.log(item);
    messages.push(data);
  });
  return messages;
};

export const editPost = (postId, textArea) => {
  updateDoc(doc(db, 'posts', postId), {
    post: textArea,
  });
  console.log('chegou aqui no firestore');
  console.log(postId);
};
