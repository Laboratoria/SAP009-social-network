import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from '../firebaseInit.js';

export const Auth = getAuth(app);

// cadastro de usuarios novos
export const createUser = (email, senha, nome, sobrenome, displayName) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Signed in
      // eslint-disable-next-line no-console
      console.log(userCredential);
      const user = userCredential.user; // aqui atualizar o perfil do usuario
      return updateProfile(user, { nome, sobrenome, displayName });
      // ...
    });
};

export const login = (email, senha) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, senha);
  // // eslint-disable-next-line no-unused-vars
  // .then((userCredential) => {
  //   // console.log('success', userCredential);
  //   window.location.hash = '#Home';
  //   // Signed in
  //   // const user = userCredential.user;
  //   // ...
  // });
};

export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  return signInWithPopup(auth, provider);
  // eslint-disable-next-line no-unused-vars
  // .then((result) => {
  //   window.location.hash = '#Home';
  // })
  // // eslint-disable-next-line no-unused-vars
  // .catch((error) => {

  // });
};

export const logOut = () => {
  const auth = getAuth();
  return signOut(auth);
  // .then(() => {
  //   // Sign-out successful.
  //   window.location.hash = '#Login';
  // })
  // // eslint-disable-next-line no-unused-vars
  // .catch((error) => {
  //   // An error happened.
  // });
};
