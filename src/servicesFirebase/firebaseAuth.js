import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Cadastrar usuários */
export const createUser = (email, senha) => createUserWithEmailAndPassword(auth, email, senha)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user; // aqui atualizar o perfil do usuario
    return updateProfile(user, { email, senha });
  });

/* Fazer Login */
export const valuesLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

/* Login com Google */

const provider = new GoogleAuthProvider();
export const googleLogin = () => signInWithPopup(auth, provider);
