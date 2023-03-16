/* eslint-disable no-console */
/* eslint-disable indent */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile, onAuthStateChanged,
} from 'firebase/auth';
import { app } from '../firebaseInit.js';

export const Auth = getAuth(app);

// cadastro de usuarios novos
// eslint-disable-next-line max-len
export const createUser = (email, senha, nome, sobrenome, displayName) => createUserWithEmailAndPassword(Auth, email, senha)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user; // aqui atualizar o perfil do usuario
    return updateProfile(user, { nome, sobrenome, displayName });
    // ...
  });
export const login = (email, senha) => signInWithEmailAndPassword(Auth, email, senha);

export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(Auth, provider);
};

export const logOut = () => signOut(Auth);

export const nameUser = async () => {
  let username;
  await new Promise((resolve, reject) => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        console.log(user);
        console.log(user.displayName);
        username = user.displayName;
        console.log(username);
        resolve();
      } else {
        alert('usuário não entrou ainda');
        reject();
      }
    });
  });
  return username;
};
