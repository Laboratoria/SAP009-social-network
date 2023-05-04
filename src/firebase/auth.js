
import {
  getAuth, signOut, signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from './config.js';

const auth = getAuth(app);

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}
