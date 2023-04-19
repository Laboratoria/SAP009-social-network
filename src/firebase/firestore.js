import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  query,
  deleteDoc,
  updateDoc,
  getDoc,
  orderBy,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { auth } from './auth.js';
import { app } from './app.js';

export const db = getFirestore(app);

// Buscar um post na coleção e mostrar todos no feed:
export const getPosts = async () => {
  const arrayPosts = [];
  const postCollection = await getDocs(query(collection(db, 'posts'), orderBy('publishDate', 'desc')));
  postCollection.forEach((post) => {
    arrayPosts.push({ id: post.id, ...post.data() });
  });
  return arrayPosts;
};
  // Essa função busca posts em uma coleção no banco de dados do firestore.
  // Ordena por data em ordem decrescente.
  // Adiciona um identificador único para cada post e retorna uma lista de posts.

// Criar novo post:
export async function newPost(postText) {
  await addDoc(collection(db, 'posts'), {
    userId: auth.currentUser.uid,
    userName: auth.currentUser.uid,
    text: postText,
    publishDate: new Date().toLocaleDateString('pt-BR'),
    like: [],
  });
}

// Buscar os dados de um post específico no banco de dados Firestore:
export async function getPost(postId) {
  const querySnapshot = await getDoc(doc(db, 'posts', postId));
  return {
    ...querySnapshot.data(),
    id: querySnapshot.id,
  };
}

// Editar post:
export async function editPost(postId, textEdit) {
  const postdoc = doc(db, 'posts', postId);
  await updateDoc(postdoc, {
    text: textEdit,
  });
}

// Excluir post:
export async function deletePost(postId) {
  const exclude = doc(db, 'posts', postId);
  await deleteDoc(exclude);
}

// Curtir post:
export async function likePost(postId) {
  let post = await getPost(postId);

  if (post.like.indexOf(auth.currentUser.uid) === -1) {
    await updateDoc(doc(db, 'posts', postId), {
      like: arrayUnion(auth.currentUser.uid),
    });
  } else { // descurtir post:
    await updateDoc(doc(db, 'posts', postId), {
      like: arrayRemove(auth.currentUser.uid),
    });
  }

  post = await getPost(postId);

  return post.like;
}
