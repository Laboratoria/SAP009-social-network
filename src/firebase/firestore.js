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
  const postCollection = await getDocs(query(collection(db, 'posts'), orderBy('data', 'desc')));
  return postCollection.docs.map((post) => ({ id: post.id, ...post.data() }));
};
  // Essa função busca posts em uma coleção no banco de dados do firestore.
  // Ordena por data em ordem decrescente.
  // Adiciona um identificador único para cada post e retorna uma lista de posts.

// Criar novo post:
export async function newPost(postText) {
  await addDoc(collection(db, 'posts'), {
    userId: auth.currentUser.uid,
    userName: auth.currentUser.displayName,
    text: postText,
    publishDate: new Date().toLocaleDateString('pt-BR'),
    like: [],
  });
}

// Buscar um post específico na coleção
// Para que o usuário só possa editar e deletar o que ele mesmo criou:
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
export async function likePost(postId, uid) {
  await updateDoc(doc(db, 'posts', postId), {
    likes: arrayUnion(uid),
  });
}

// Descurtir post:
export async function unlikePost(postId, uid) {
  await updateDoc(doc(db, 'posts', postId), {
    likes: arrayRemove(uid),
  });
}
