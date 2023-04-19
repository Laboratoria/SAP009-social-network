/* eslint-disable consistent-return */
/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
// eslint-disable-next-line no-unused-vars, import/order, object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from './firebase.config.js';

export const auth = getAuth(app);

// Firebase Authentication

export function criarCadastro(email, password, name) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((usuaria) => updateProfile(usuaria.user, { displayName: name }));
}

export function fazerLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function observador(cb) { // verifica se tem usuário logado ou não
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      cb(true);
    } else {
      cb(false);
    }
  });
}

export function verificarEmail(){
  return sendEmailVerification(auth.currentUser)
    .then(() => {
    // Email verification sent!
    // eslint-disable-next-line indent
    })
    .catch((error) => {
      console.log(error);
    });
}

export function loginComGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function sair() {
  return signOut(auth);
}

export function nomeUsuaria() {
  const user = auth.currentUser;
  console.log(user);
  if (user){
    return user.displayName;
  }
}

export function dadosUsuaria() {
  const dataPostagem = new Date();
  const user = auth.currentUser;
  const usuaria = {
    userId: user.uid,
    userName: user.displayName,
    userEmail: user.email,
    dataPostagem: dataPostagem.toLocaleString(),
    curtidas: 0,
  };

  return usuaria;
}
