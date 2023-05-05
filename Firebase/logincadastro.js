import { getAuth, signInWithLoginAndPassword } from 'firebase/auth';
import app from './firebase.js';

const auth = getAuth(app);

export default function login(email, password) {
  return signInWithLoginAndPassword(auth, email, password);
}
