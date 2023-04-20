import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { app } from './firebase.js';

export const auth = getAuth(app);

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginGoggle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
