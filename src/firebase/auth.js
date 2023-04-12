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

export const nameUser = () => auth.currentUser.displayName;
export const userUID = () => auth.currentUser.uid;

export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);

// export function delectUser() {
//   const user = auth.currentUser;
//   deleteUser(user).then(() => {
//     // se for ok, deletada
//   }).catch((error) => {
//     console.log(error);
//   });
// }
