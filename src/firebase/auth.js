/* eslint-disable */
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
export const auth = getAuth(app);
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

// export function signIn(email, password) {
//   return new Promise((resolve, reject) => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         resolve(true);
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         console.log(errorMessage);
//         reject(errorMessage);
//         return false;
//       })
//       .finally(() => {
//         console.log('Processo de login finalizado em auth.');
//       });
//   });
// }

export function signIn(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        resolve(true);
      })
      .catch((error) => {
        console.log(error.message);
        reject(new Error(error.message));
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
        // const token = credential.accessToken;
        // const user = result.user;
        // Retornar true se a autenticação foi bem-sucedida
        resolve(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
       // const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Retornar false se houver um erro na autenticação
        console.log(error.message);
        reject(new Error(error.message));
        
        return false;
      })
      .finally(() => {
        console.log('Login pelo Google finalizado em auth.');
      });
  });
}

// export function LogOut() {
//   return new Promise((resolve, reject) => {
//     signOut(auth)
//       .then(() => {
//         console.log('Logout: No user');
//         resolve();
//       })
//       .catch((error) => {
//         console.log(`Logout: Logged in as ${auth.currentUser.email}`);
//         reject(error);
//       });
//   });
// // }

// export function LogOut(userCredential) {
//   return new Promise((resolve, reject) => {
//     signOut()
//       .then(() => {
//         const user = u;
//         console.log('Logout: No user' + user);
//         resolve();
//       })
//       .catch((error) => {
//         console.error(error);
//         reject(error);
//       });
//   });
// }

export function LogOut() {
  console.log(  'oi');
  signOut(auth, (user) => {
     console.log(user); //NÃO VOLTA NADA?
    if (userCredential.user) {
      console.log(`Logout: Logged in as ${user.email}`);
    } else {
      console.log('Logout: No user');
    }
  });
}

// export function LogOut() {
//   return new Promise((resolve, reject) => { 
//    signOut(auth, (user)
//       .then((result) => {
//        console.log(`Logout: Logged in as ${user.email}`);
//        resolve(true)
//      })
//      .catch((error) => {
//        console.log('Logout: No user');
//        resolve(error);
//      }) )
//      })
//          }
export function authStateChanged(){
onAuthStateChanged(auth, (user) => {
  // console.log(user);
  if (user) {
    console.log(`onAuthStateChange: Logged in as ${user.email}`);
  } else {
    console.log('onAuthStateChange: No user');
  }
})};
