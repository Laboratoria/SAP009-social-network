import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Cadastrar usuários */
export const createUser = (email, senha) => {
  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log('foi');
      window.location.hash = '#login';
    });
  /*  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    }); */
  return updateProfile({ email, senha });
};

export const valuesLogin = (email, senha) => {
  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      window.location.href = '#feed';
      console.log('foi');
    })
    .catch(() => {
      txtError.setAttribute('style', 'display: block');
      txtError.innerHTML = 'Usuário ou senha incorretos';
      /* senha.focus(); */
    });
};

/* Login com Google */

const provider = new GoogleAuthProvider();

export function googleLogin() {
  return signInWithPopup(auth, provider);
}
