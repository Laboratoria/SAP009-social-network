import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/* Cadastrar usuários */
export const createUser = (email, senha, inputNome, displayName) => createUserWithEmailAndPassword(auth, email, senha, inputNome,  displayName)
  .then((userCredential) => {
    const user = userCredential.user;
    return updateProfile(user, { email, senha, displayName });
  });

/* Fazer Login */
export const valuesLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

/* Login com Google */

const provider = new GoogleAuthProvider();
export const googleLogin = () => signInWithPopup(auth, provider);

/* Sair do perfil */
export const sairPerfil = () => signOut(auth);
