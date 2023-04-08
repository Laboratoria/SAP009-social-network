import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from './app.js';

export const auth = getAuth(app);

/*export async function createUser(name, email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(auth.currentUser, {
    displayName: name,
  });
}*/


//login usuario cadastrado ok
export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

//login google ok
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);