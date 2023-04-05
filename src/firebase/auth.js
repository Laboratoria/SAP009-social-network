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

export function createUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
//    .then(() => {
//   updateProfile(auth.currentUser, {
//     displayName: name,
//   });
//   confirmationMessage.innerHTML = 'CADASTRO REALIZADO COM SUCESSO! &#x2705 <br> Agora, faça o login para entrar!';
//   window.location.hash = '#login';
// })
// .catch(() => {
//   errorMessage.innerHTML = validationRegister;
// });
}

export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);
