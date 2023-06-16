import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from './app.js';

export const getAppAuth = () => getAuth(app);

export const getUserId = () => {
  const auth = getAppAuth();
  return auth.currentUser.uid;
};
/*
export const createUserWithEmail = (name, email, password) => {
  const auth = getAppAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
*/

export const createUserWithEmail = async (name, email, password) => {
  try {
    const auth = getAppAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
  } catch (error) {
    throw new Error('Houve um erro. Favor rever as informações e tentar novamente');
  }
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
