/* eslint-disable no-alert */
import 'firebase/firestore';
import {
  getAuth, createUserWithEmailAndPassword, updateProfile,
  signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,

} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

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
