// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCXzj5MfGytnQSWwjsq5VKWlEfyc6Z6AMg',
  authDomain: 'social-network-69ad3.firebaseapp.com',
  projectId: 'social-network-69ad3',
  storageBucket: 'social-network-69ad3.appspot.com',
  messagingSenderId: '299175801388',
  appId: '1:299175801388:web:21026ac0c0be9396261789',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const fazerLogin = (nome, senha) => {
  return signInWithEmailAndPassword(auth, nome, senha);
};

export const fazerCadastro = (nome, senha) => {
  return createUserWithEmailAndPassword(auth, nome, senha);
};

export const fazerLoginComGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
