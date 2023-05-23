import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase.js';

const auth = getAuth(app);

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
