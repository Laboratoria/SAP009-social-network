/* eslint-disable no-console */
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseInit';

export const userData = (name, lastname) => addDoc(collection(db, 'infos-add'), {
  nome: name,
  sobrenome: lastname,
});

export const newPost = (postagem, dataPostagem, username) => addDoc(collection(db, 'posts'), {
  userName: username,
  data: dataPostagem,
  post: postagem,
  // idUser: Auth.currentUser.uid,
});

export const accessPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const messages = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    messages.push(data);
  });
  return messages;
};
