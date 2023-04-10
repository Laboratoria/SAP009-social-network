import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from './configuration.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginToFeed = (email, password) => signInWithEmailAndPassword(auth, email, password);

function loginWithGoogle() {
  const providerGoogle = new GoogleAuthProvider();
  const authGoogle = getAuth(app);
  return signInWithPopup(authGoogle, providerGoogle);
}
const register = async (name, email, password) => {
  const authenticateRegister = getAuth(app);
  await createUserWithEmailAndPassword(authenticateRegister, email, password);

  return updateProfile(authenticateRegister.currentUser, {
    displayName: name,
  });
};

const resetPassword = (email) => sendPasswordResetEmail(auth, email);

const logout = () => signOut(auth, provider);

export {
  loginToFeed,
  loginWithGoogle,
  logout,
  register,
  resetPassword,
};
