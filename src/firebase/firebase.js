/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
import { app } from './firebase.config.js';
// eslint-disable-next-line no-unused-vars, import/order, object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, GoogleAuthProvider, deleteUser, signInWithPopup, signOut } from 'firebase/auth';
// Inicialize o Firebase Authentication e obtenha uma referência para o serviço
const auth = getAuth(app);

export function criarCadastro(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function fazerLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function observador() { // verifica se tem usuário logado ou não
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
    // O usuário está conectado, consulte os documentos para obter uma lista de propriedades disponíveis;
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // console.log(uid);
    } else {
      // O usuário está desconectado
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

export function deletarUsuaria() {
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    // se for ok, deletada
  }).catch((error) => {
    console.log(error);
  });
}

export function verificarIdUsuaria() {
  const user = auth.currentUser;
  console.log(user);

  if (user !== null) {
    // propriedade do obj já existentes pelo firebase
    const displayName = user.displayName;
    const email = user.email;
    const uid = user.uid;
    console.log(displayName);
    console.log(email);
    console.log(uid);
  } else {
    console.log('user nulo');
  }
}