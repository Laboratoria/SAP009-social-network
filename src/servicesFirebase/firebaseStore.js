/* eslint-disable no-console */
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseInit';

export const userData = async (name, lastname) => {
  try {
    const docRef = await addDoc(collection(db, 'infos-add'), {
      nome: name,
      sobrenome: lastname,
    });

    // eslint-disable-next-line no-console
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error adding document: ', e);
  }
};
export const newPost = async (postagem) => { // colocar data da postagem
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      // Username: username,
      // data: dataPostagem,
      post: postagem,
      // add atributo usuario
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const printPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const messages = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    messages.push(data);
  });
  return messages;
};

// const firebase = require("firebase")
// // Required for side-effects
// require("firebase/firestore
