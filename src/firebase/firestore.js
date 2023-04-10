import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
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

export const pegarPost = async (mostrarPost) => {
  await onSnapshot(collection(db, 'posts'), orderBy('date', 'desc'), (querySnapshot) => {
    document.querySelector('.ultimos-posts').innerHTML = '';
    querySnapshot.forEach((post) => {
      mostrarPost(post.data());
      console.log(post.id, ' => ', post.data());
    });
  });
};

export const fazerPost = async (titulo, autora, post) => {
  const auth = getAuth(app);
  try {
    const dataPost = Date.now();
    const dataAtualizada = new Date(dataPost);
    const dataPostagem = dataAtualizada.toLocaleDateString();
    const docRef = await addDoc(collection(db, 'posts'), {
      nome: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      titulo,
      autora,
      post,
      date: dataPostagem,
      like: 0,
      likesUsuaria: [],
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const curtirPost = async (postId, userId) => updateDoc(doc(db, 'posts', postId), {
  likesUsuaria: arrayUnion(userId),
});

export const descurtirPost = async (postId, userId) => updateDoc(doc(db, 'posts', postId), {
  likesUsuaria: arrayRemove(userId),
});
