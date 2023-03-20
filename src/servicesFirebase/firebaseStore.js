/* eslint-disable no-console */
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
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
  likes: 0,
  likesUsers: [],
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
  console.log(textArea);
};
// preciso guardar o like em algum lugar, no firestore;
// ;

export const likeCounter = async (likePost, postId, usernameUser) => updateDoc(doc(db, 'posts', postId), {
  likes: likePost,
  likesUsers: arrayUnion(usernameUser),
});

export const deslikeCounter = async (likePost, postId, usernameUser) => updateDoc(doc(db, 'posts', postId), {
  likes: likePost,
  likesUsers: arrayRemove(usernameUser),
});

export const deletePost = async (postId) => {
  await deleteDoc(doc(db, 'posts', postId));
};

// export const likeArray = async (currentUser) => {
//   const postsRef = collection(db, 'posts');
//   const q = query(postsRef, where('likes', '==', 0));
//   const querySnapshot2 = await getDocs(q);
//   const arrayLikes = [];
//   querySnapshot2.forEach((doc2) => {
//     // doc.data() is never undefined for query doc snapshot;
//     const dataLikes = doc2.data();
//     arrayLikes.push(dataLikes);
//   });
//   console.log(arrayLikes);
//   return arrayLikes;
// };
