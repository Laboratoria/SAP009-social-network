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
  updateProfile
} from 'firebase/auth';

// meu app importado de app.js
import { app } from './app.js';

// variável executa a funcao getAuth em cima do nosso app
export const auth = getAuth(app);
//  console.log(auth);
// const uid = auth.uid;
// console.log(uid);
import {db} from '../firestore/firestore.js';
import {setDoc, doc , getDoc} from 'firebase/firestore';
export let userLogged = null;
// funcao para abrigar a funcao de criar usuario com email e senha (da documentação do firebase)
// export function createUserWithEmail(email, password) {
//   return new Promise((resolve, reject) => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in
//         console.log('email-criado');
//         console.log(userCredential);
//         const user = userCredential.user;
//         resolve(true);

//         // ...
//       })
//       .catch((error) => {
//         console.log('email-nao-criado');
//         const errorCode = error.code;
//         const errorMessage = error.message;

//         console.log(errorMessage);
//         reject(false);
//         // ..
//       })
//       .finally(() => {
//         console.log('Processo de criação de conta finalizado em auth.');
//       });
//   });
// }
export async function createUserWithEmail(email, password, name) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
       // const user = userCredential.user;
        resolve(true);
          const user = {
          email: email,
          name: name,
                };      
        setDoc(doc(db, 'users', auth.currentUser.uid), user);
        updateProfile(auth.currentUser, { displayName: name });
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
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
        userLogged = userCredential.user;
        console.log(userLogged);
        resolve(true);
      

      })
      .catch((error) => {
        console.log(error.message);
        reject(error.message);
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
        resolve(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
       // const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error.message);
        reject(new Error(error.message));        
        return false;
      })
      .finally(() => {
        console.log('Login pelo Google finalizado em auth.');
      });
  });
}


export function LogOut(user) {
  console.log('oi');
  console.log(userLogged);
console.log(auth);
 
return signOut(auth).then(() => {
  console.log(`Logout: Logged in as ${user.email}`);
  return auth;
}).catch((error) => {
  console.log('Logout: No user');
  return null;
});
};
  
export function authStateChanged(){
  onAuthStateChanged(auth, (user) => {
    // console.log(user);
    if (user) {
      console.log(`onAuthStateChange: Logged in as ${user.email}`);
    } else {
      console.log('onAuthStateChange: No user');
    }
  })};


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



 export const getUserData = async () => {
  const usuarioRef = await getDoc(doc(db, 'users', auth.currentUser.uid));

  console.log(auth.currentUser);
  console.log(usuarioRef);

  const user = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    email: usuarioRef.data().email,
    name: usuarioRef.data().name,    
  };

  console.log(user);

  return user;
}

