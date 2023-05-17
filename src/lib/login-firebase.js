import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const auth = getAuth();

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
