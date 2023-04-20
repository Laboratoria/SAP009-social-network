import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { app } from './app.js';

export const auth = getAuth(app);

// Retornará o nome do usuário atualmente autenticado no firebase:
export const nameUser = () => auth.currentUser.displayName;
// Retornará o UID do usuário atualmente autenticado no firebase:
export const userUID = () => auth.currentUser.uid;

// Cadastrar novo usuário:
export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Autenticar usuário:
export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Login com google:
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Opção de sair (deslogar):
export const logOut = () => signOut(auth);
