import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();

export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }