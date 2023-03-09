import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { firebaseConfig } from './firebase-config';
// os imports acima são de funções do firebase
import { redirecionarPagina } from '../redirecionar-pagina';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

// const analytics = getAnalytics(app);

// aqui vamos criar as const que autenticar, registrar...

function autenticarUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

// registrar novo usuário
function criarUsuario(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

// login com google
function logarGoogle() {
  signInWithPopup(auth, provider)
    .then(() => {
      redirecionarPagina('#feed');
    })
    .catch(() => {
    });
}

const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

export {
  autenticarUsuario,
  criarUsuario,
  logarGoogle,
  redefinirSenha,
};
