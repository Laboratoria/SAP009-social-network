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
export const createUser = (email, senha, displayName) => createUserWithEmailAndPassword(auth, email, senha)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, { email, senha, displayName });
    console.log(auth.currentUser);
    return userCredential;
  });

/* Fazer Login do usuário */
export const valuesLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

/* Login com Google */

const provider = new GoogleAuthProvider();
export const googleLogin = () => signInWithPopup(auth, provider);

/* Sair do perfil do usuário */
export const sairPerfil = () => signOut(auth);