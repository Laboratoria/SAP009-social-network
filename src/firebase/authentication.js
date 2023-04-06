import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { app } from './configuration.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginToFeed = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const loginWithGoogle = () => signInWithPopup(auth, provider);

export const logout = () => signOut(auth, provider);
export const register = async (name, email, password) => {
  const authenticateRegister = getAuth(app);
  await createUserWithEmailAndPassword(authenticateRegister, email, password);

  return updateProfile(authenticateRegister.currentUser, {
    displayName: name,
  });
};
