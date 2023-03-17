// importacao das funcoes de autenticação de usuários do modulo firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// meu app importado de app.js
import { app } from './app.js';

// variável executa a funcao getAuth em cima do nosso app
const auth = getAuth(app);
// console.log(auth);

// funcao para abrigar a funcao de criar usuario com email e senha (da documentação do firebase)
export function createUserWithEmail(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('email-criado');
        console.log(userCredential);
        const user = userCredential.user;
        resolve(true);
        // ...
      })
      .catch((error) => {
        console.log('email-nao-criado');
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        reject(false);
        // ..
      })
      .finally(() => {
        console.log('Processo de criação de conta finalizado em auth.');
      });
  });
}

export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(true);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        reject(false);
      })
      .finally(() => {
        console.log('Processo de login finalizado em auth.');
      });
  });
}

const provider = new GoogleAuthProvider();
// console.log(provider);

export function loginGoogle() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        // Retornar true se a autenticação foi bem-sucedida
        resolve(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Retornar false se houver um erro na autenticação
        reject(false);
      })
      .finally(() => {
        console.log('Login pelo Google finalizado em auth.');
      });
  });
}

export function LogOut() {
  signOut(auth, (user) => {
    // console.log(user); //NÃO VOLTA NADA?
    if (user) {
      console.log(`Logout: Logged in as ${user.email}`);
    } else {
      console.log('Logout: No user');
    }
  });
}

onAuthStateChanged(auth, (user) => {
  // console.log(user);
  if (user) {
    console.log(`onAuthStateChange: Logged in as ${user.email}`);
  } else {
    console.log('onAuthStateChange: No user');
  }
});
