import './pages/login/index.js';
import './index';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
//import { loginEmail, loginSenha, loginBotao } from './ui';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCEBQM0DWvNE7_H4CBZUszGNzmDDVi_BPQ',
  authDomain: 'lemos-sap009.firebaseapp.com',
  projectId: 'lemos-sap009',
  storageBucket: 'lemos-sap009.appspot.com',
  messagingSenderId: '537373914721',
  appId: '1:537373914721:web:b00c5e0ed7282317f75c20',
  measurementId: 'G-VMMT7LJBN3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// onAuthStateChanged(auth, user => { /* check status */ });

export function fazerLogin(email, senha) {
  signInWithEmailAndPassword(auth, email, senha)
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

// export const loginEmailSenha = async () => {
//   const usuarioCadastro = await signInWithEmailAndPassword(auth, loginEmail, loginSenha);
//   return usuarioCadastro;
// }

//loginBotao.addEventListener('click', loginEmailSenha);


// createUserWithEmailAndPassword(auth, 'teste@gmail.com', '123456')
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// console.log('Oiii');