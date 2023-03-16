/* eslint-disable no-console */
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { Auth } from './firebaseAuth';

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
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dataPostagem = today.toLocaleDateString();
    console.log(Auth.currentUser.uid);
    const docRef = await addDoc(collection(db, 'posts'), {
      userName: Auth.currentUser.displayName,
      data: dataPostagem,
      post: postagem,
      idUser: Auth.currentUser.uid,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const accessPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const messages = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    messages.push(data);
  });
  return messages;
};

// export const datePost = async
//   const timeElapsed = Date.now();
//   const today = new Date(timeElapsed);
//   const dataPostagem = today.toLocaleDateString();
