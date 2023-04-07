/* eslint-disable consistent-return */
/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
// eslint-disable-next-line no-unused-vars, import/order, object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from './firebase.config.js';

const auth = getAuth(app);

// Firebase Authentication

export function criarCadastro(email, password, name) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((usuaria) => updateProfile(usuaria.user, { displayName: name }));
  // () => {
  //   updateProfile(auth.currentUser, {
  //     displayName,
  //     uid: auth.currentUser.uid,
  //     email: auth.currentUser.email,
  //     password,
  //   });
  //   console.log(displayName, uid, email, password);
  // });
  // mudei de displayName para displayName: name
}
export function fazerLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function observador() { // verifica se tem usuário logado ou não
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      return false;
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
  return signOut(auth).then(() => {
    // saiu
  }).catch((error) => {
    console.log(error);
  });
}

export function nomeUsuaria() {
  const user = auth.currentUser;
  console.log(user);
  if (user == null){
    return 'Usuária';
  }
  return user.displayName;
}

export const dataPostagem = () => {
  console.log(auth.currentUser);
  const dataPublicação = new Date();
  return dataPublicação.toLocaleString();
};

export function dadosUsuaria() {
  const dataAtual = new Date();
  const dataPostagem = dataAtual.toLocaleString();
  const user = auth.currentUser;

  const usuaria = {
    userId: user.uid,
    userName: user.displayName,
    // displayName: user.displayName,
    // email: user.email,
    // uid: user.uid,
    // id: user.id,
    hoje: dataPostagem,
    data: dataAtual.toLocaleDateString(),
  };
  console.log(usuaria);
  return usuaria;
}
