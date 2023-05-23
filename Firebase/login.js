import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase.js';

const auth = getAuth(app);

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
