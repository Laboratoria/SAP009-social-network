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
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// criar colecao nova e guardar quando usuario digitar a postagem, guardar na colecao posts
// quando apertar botao postar, acontece o de cima ^

export const printPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc);
    console.log(doc.value);
  });
};

// const firebase = require("firebase")
// // Required for side-effects
// require("firebase/firestore
