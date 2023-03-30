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
  const auth = getAuth(firebaseApp);
  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => updateProfile(auth.currentUser, {
      displayName: name,
    }));
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
