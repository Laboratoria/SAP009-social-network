import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { app } from './firebase.js';

export const auth = getAuth(app);
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

export async function createUser(email, password, username) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, {
    displayName: username,
  });

  return user;
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
