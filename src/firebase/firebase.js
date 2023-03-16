/* eslint-disable max-len */
import { app } from './firebase.config.js';
// eslint-disable-next-line no-unused-vars, import/order, object-curly-newline
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// Inicialize o Firebase Authentication e obtenha uma referência para o serviço
const auth = getAuth(app);
export function criarCadastro(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
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
export function fazerLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
export function observador() {
  onAuthStateChanged(auth, (user) => {
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
