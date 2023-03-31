import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Cadastrar usuários */
export const createUser = (email, senha) => createUserWithEmailAndPassword(auth, email, senha);

/* Fazer Login */
export const valuesLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

/* Login com Google */

const provider = new GoogleAuthProvider();
export const googleLogin = () => signInWithPopup(auth, provider);

/* Sair do perfil */
export const sairPerfil = () => signOut(auth);
