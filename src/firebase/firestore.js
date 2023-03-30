import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from './firebase';

const db = getFirestore(app);

export const database = async (name, email) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name,
      email,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const pegarPost = async (nome, titulo, autora, post) => {
  const promessaDados = await getDocs(collection(db, 'posts'));
  promessaDados.forEach((post) => {
    console.log(post.id, " => ", post.data());
  });
};

export const fazerPost = async (titulo, autora, post) => {
  const auth = getAuth(app);

  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      nome: auth.currentUser.displayName,
      titulo: titulo,
      autora: autora,
      post: post,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
