/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// nosso app importado de app.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
// eslint-disable-next-line import/no-unresolved
} from 'firebase/auth';
import { app } from './app.js';

// import das funcoes da autenticação de usuários do arquivo js do firebase referenciado nessa url

// variável executa a funcao getAuth em cima do nosso app
// variável recebe nosso app e permite que a gente execute as funcões auth em cima do nosso app

// funcao que criamos para abrigar a funcao de criar user com email/senha (já criada pelo firebase)
export const getAppAuth = () => getAuth(app);

export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};

// eslint-disable-next-line max-len
export const createUserWithEmail = (name, email, password) => {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    });
};

export const signIn = (email, password) => {
  const auth = getAppAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAppAuth();
  return signInWithPopup(auth, provider);
};

export const logOut = () => {
  const auth = getAppAuth();
  return signOut(auth);
};

export const checkLoggedUser = (check) => {
  const auth = getAppAuth();
  return onAuthStateChanged(auth, check);
};
