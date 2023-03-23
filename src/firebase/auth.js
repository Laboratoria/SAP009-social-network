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
  updateProfile,
  
} from 'firebase/auth';

// app importado de app.js
import { app } from './app.js';

// variável executa a funcao getAuth em cima do app
export const auth = getAuth(app);
import {db} from '../firestore/firestore.js';
import {setDoc, doc , getDoc, getDocs, collection, addDoc } from 'firebase/firestore';
export let userLogged = null;
// funcao para abrigar a funcao de criar usuario com email e senha (da documentação do firebase)

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

//  export const getUserData = async () => {
//   const userReference = await getDoc(doc(db, 'users', auth.currentUser.uid));
//   const messageRef = doc(db, "users", auth.currentUser.uid, "posts");
//   console.log(userReference);
//   console.log(messageRef);

//   const user = {
//     uid: auth.currentUser.uid,
//     displayName: auth.currentUser.displayName,
//     email: userReference.data().email,
//     name: userReference.data().name,    
//   };

//   console.log(user);
//   return user;
// }


