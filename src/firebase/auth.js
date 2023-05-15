// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from './config.js';

const auth = getAuth(app);

export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}
