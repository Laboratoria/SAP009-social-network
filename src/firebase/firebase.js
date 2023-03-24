/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
import { app } from './firebase.config.js';
// eslint-disable-next-line no-unused-vars, import/order, object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, GoogleAuthProvider, deleteUser, signInWithPopup, signOut } from 'firebase/auth';
// Inicialize o Firebase Authentication e obtenha uma referência para o serviço
const auth = getAuth(app);

export function criarCadastro(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function fazerLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function observador() {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
    // O usuário está conectado, consulte os documentos para obter uma lista de propriedades disponíveis;
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
    } else {
      // O usuário está desconectado
    }
  });
}

export function verificarEmail(){
  return sendEmailVerification(auth.currentUser)
    .then(() => {
    // Email verification sent!
    // eslint-disable-next-line indent
    })
    .catch((error) => {
      console.log(error);
    });
}

export function loginComGoogle() {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then((result) => {
      // fornece um token de acesso do google, usado para acessar o Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; // informações da usuária conectada
      const user = result.user; // dados do IdP disponíveis usando getAdditionalUserInfo(result)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; // email da conta da usuária usado
      console.log(errorCode);
      console.log(errorMessage);
      const email = error.customData.email; // o AuthCredential usado
      console.log(email);
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  // após fazer a validação do google precisa mandar para pg de login com o firebase ou pode ser com windonw location hash?
}

export function sair() {
  return signOut(auth).then(() => {
    // saiu
  }).catch((error) => {
    console.log(error);
  });
}

export function deletarUsuaria() {
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    // se for ok, deletada
  }).catch((error) => {
    console.log(error);
  });
}