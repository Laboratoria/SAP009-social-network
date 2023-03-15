// nosso app importado de app.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { app } from './app.js';

// importacao das funcoes da autenticação de usuários do arquivo js do firebase referenciado nessa url

// variável executa a funcao getAuth em cima do nosso app
// variável recebe nosso app e permite que a gente execute as funcões autenticação em cima do nosso app
const auth = getAuth(app);
console.log(auth);

// funcao que criamos para abrigar a funcao de criar usuario com email e senha (já criada pelo firebase)
export function createUserWithEmail(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in
        resolve(true);
        console.log('email-criado');
        console.log(userCredential);
        const user = userCredential.user;
      // ...
      })
      .catch((error) => {
        reject(error);
        console.log('email-nao-criado');
        const errorCode = error.code;
        const errorMessage = error.message;
      // ..
      })
      .finally(() => {
        console.log('Processo de cadastro finalizado');
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
        reject(error);
      })
      .finally(() => {
        console.log('Processo de login finalizado');
      });
  });
}

const provider = new GoogleAuthProvider();
// console.log(provider);

export function loginGoogle() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        resolve(true);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('Logou com o google')
        // Retornar true se a autenticação foi bem-sucedida
        return true;
      })
      .catch((error) => {
      // Handle Errors here.
        reject(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Não ogou com o google');

        // Retornar false se houver um erro na autenticação
        return false;
      });
  });
}

export function LogOut() {
  signOut(auth, (user) => {
    console.log(user);
    if (user) {
      console.log(`Logout: Logged in as ${user.email}`);
    } else {
      console.log('Logout: No user');
    }
  });
}

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    console.log(`onAuthStateChange: Logged in as ${user.email}`);
  } else {
    console.log('onAuthStateChange: No user');
  }
});
