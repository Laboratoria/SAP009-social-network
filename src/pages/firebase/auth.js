import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import { app } from './firebase.js';

export const auth = getAuth(app);
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export function createUser(email, password, username) {
  return createUserWithEmailAndPassword(auth, email, password).then((user) => {
    user.updateProfile({ displayName: username });
  });
}

export const loginGoggle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = () => auth.signOut()
  .then(() => {
    window.location.hash = '#login';
  })
  .catch(() => {

  });
