import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from 'firebase/auth';

import { app } from './app.js';

export const auth = getAuth(app);

export const nameUser = () => auth.currentUser.displayName;
export const userUID = () => auth.currentUser.uid;

export function createUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
   
}


/*export function createUser(name, email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userredential) => {
        console.log(userCrdential);
        console.log('Processo de criação de conta finalizado em auth.');
        resolve(true);
        const user = {
          email,
          name,
        };
        setDoc(doc(db, 'users', auth.currentUser.uid), user);
        updateProfile(auth.currentUser, { displayName: name });
      })
      .catch((error) => {
        const errorMessage = error.message;
        reject(errorMessage);
      })
      .finally(() => {
      });
  });
}*/

/* export async function createUser(name, email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(auth.currentUser, {
    displayName: name,
  });
} */

// login usuario cadastrado ok
export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

// login google ok
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);

export function delectUser() {
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    // se for ok, deletada
  }).catch((error) => {
    console.log(error);
  });
}
