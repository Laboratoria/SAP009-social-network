import { initializeApp } from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import {
  firebaseConfig,
} from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Armazenar conta do usuário//

export async function userData(nome, email, uid) {
  await addDoc(collection(db, 'users'), {
    displayName: nome,
    email,
    uid,
  });
}

// criar post//
export async function newPost(dataPostagem, id, post, username) {
  const docRef = await addDoc(collection(db, 'post'), {
    date: dataPostagem,
    idUser: id,
    textArea: post,
    userName: username,
    likes: [],
  });
  // newPost.id = docRef.id;
  // return newPost;
  const doc = await getDoc(docRef);
  /* console.log(doc.data().textArea); */
  return doc;
}

// printar posts na tela //
export async function postsNaTela() {
  const novoArray = [];
  const q = query(collection(db, 'post'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    novoArray.push(doc);
  });
  return novoArray;
}

// adicionar like //
const addLikePost = async (postId, idUser) => {
  await updateDoc(doc(db, 'post', postId), {
    likes: arrayUnion(idUser),
  });
};

// retirar like //
const removeLike = async (postId, idUser) => {
  await updateDoc(doc(db, 'post', postId), {
    likes: arrayRemove(idUser),
  });
};

// pegar um post dos documentos //
const getPost = async (postId) => {
  const ref = doc(db, 'post', postId);
  const result = await getDoc(ref);
  return result.data();
};

/* função geral para add e retirar likes:
adicionar ou retirar id's dos usuários no array de likes */

export const likePost = async (postId, idUser) => {
  const post = await getPost(postId);
  const alreadyLiked = post.likes.includes(idUser);
  let count = post.likes.length;
  let liked;
  if (alreadyLiked) {
    removeLike(postId, idUser);
    count -= 1;
    liked = false;
  } else {
    addLikePost(postId, idUser);
    count += 1;
    liked = true;
  }
  return { liked, count };
};

// deletar posts //

export async function deletarPost(postId) {
  await deleteDoc(doc(db, 'posts', postId));
}
