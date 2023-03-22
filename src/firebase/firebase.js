/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
import { app } from './firebase.config.js';
// eslint-disable-next-line no-unused-vars, import/order, object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, GoogleAuthProvider, deleteUser, signInWithPopup } from 'firebase/auth';
// Inicialize o Firebase Authentication e obtenha uma referência para o serviço
const auth = getAuth(app);

export function criarCadastro(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
export function fazerLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
export function observador() { // CHAMEI no login ver como funciona
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
    // O usuário está conectado, consulte os documentos para obter uma lista de propriedades disponíveis;
    // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
    } else {
      // O usuário está desconectado
    }
  });

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
  console.log(provider);

  return signInWithPopup(auth, provider)
    .then((result) => {
      // fornece um token de acesso do google, usado para acessar o Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; // informações da usuária conectada
      console.log(token);
      const user = result.user; // dados do IdP disponíveis usando getAdditionalUserInfo(result)
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; // email da conta da usuária usado
      console.log(errorCode);
      console.log(errorMessage);
      const email = error.customData.email; // o AuthCredential usado
      console.log(email);
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
    });
  // após fazer a validação do google precisa mandar para pg de login com o firebase ou pode ser com windonw location hash?
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
  console.log(provider);

  return signInWithPopup(auth, provider)
    .then((result) => {
      // fornece um token de acesso do google, usado para acessar o Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken; // informações da usuária conectada
      console.log(token);
      const user = result.user; // dados do IdP disponíveis usando getAdditionalUserInfo(result)
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message; // email da conta da usuária usado
      console.log(errorCode);
      console.log(errorMessage);
      const email = error.customData.email; // o AuthCredential usado
      console.log(email);
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential);
    });
  // após fazer a validação do google precisa mandar para pg de login com o firebase ou pode ser com windonw location hash?
}

export function deletarUsuaria() {
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    // se for ok, deletada
  }).catch((error) => {
    console.log(error);
  });
}