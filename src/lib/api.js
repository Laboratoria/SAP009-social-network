/* eslint-disable no-alert */
import {
  getAuth, createUserWithEmailAndPassword, updateProfile,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,

} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export async function listarPosts() {
  const colecao = await getDocs (collection(db,'Posts'));
  colecao.forEach((post) => {
    console.log('=>', post.data());
  });
  // const colecao = collection(db, 'Posts').get();
  // const A = query(colecao);
  console.log(colecao);
  // db.collection('Posts').get().then(querySnapshot => {
  //   querySnapshot.forEach(doc => {
  //     console.log(doc.id, '=>', doc.data());
  //   });
  // });
  // const posts = onSnapshot(doc(db, 'Posts', 'DRsNNiRch7gIh8PEmCG9'), (post) => {
  //     console.log('Current data:', post.data());
  //   });
}

//  função para criar cadastro
export function cadastrar(name, email, senha) {
  // console.log(firebaseApp);
  const auth = getAuth(firebaseApp);
  // console.log('teste');
  return createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      // console.log(auth.currentUser);
      alert('Seu cadastro foi realizado com sucesso!');
      window.location.hash = '#login';
    })
    .catch(() => {
      alert('Falha ao cadastrar, por favor verifique os dados digitados');
    });
}

// função de login do usuário
export function loginUser(email, senha) {
  const auth = getAuth(firebaseApp);
  return signInWithEmailAndPassword(auth, email, senha);
}

// função de login com Google
export function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider)
    .then(() => {

    }).catch(() => {

    });
}

// export const sair = signOut(auth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//   // An error happened.
// });
