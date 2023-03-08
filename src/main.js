import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import login from './login/login.js';

// const main = document.querySelector('#root');

// window.addEventListener('load', () => {
//   main.appendChild(login());
// });

const main = document.querySelector('#root');

const loginPage = login();

main.appendChild(loginPage);

const loginButton = loginPage.querySelector('#sign-in');

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDxT35_dol3gw5dunaZUvJN4CuxkFXRnrI',
  authDomain: 'social-network-5b156.firebaseapp.com',
  projectId: 'social-network-5b156',
  storageBucket: 'social-network-5b156.appspot.com',
  messagingSenderId: '536395370159',
  appId: '1:536395370159:web:92d72ff9a0d0b06f8e4e5a',
  measurementId: 'G-QHVCCK6HZ4',
});

const auth = getAuth(firebaseApp);

const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
// const registerButton = document.getElementById("register");
// const loginButton = document.getElementById("sign-in");
const signOutButton = document.getElementById('sign-out');

// registerButton.addEventListener("click", function () {
//   const email = inputEmail.value;
//   const password = inputPassword.value;

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       console.log("User created:", user.email);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("Error creating user:", errorMessage);
//     });
// });

loginButton.addEventListener('click', () => {
  const email = inputEmail.value;
  const password = inputPassword.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log('login');

      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      console.log(`Logged in as ${user.email}`);
    } else {
      console.log('No user');
    }
  });
});

signOutButton.addEventListener('click', () => {
  signOut(auth, (user) => {
    console.log(user);
    if (user) {
      console.log(`Logged in as ${user.email}`);
    } else {
      console.log('No user');
    }
  });
});

// onAuthStateChanged(auth, (user) => {
//   console.log(user);
//   if (user) {
//     console.log(`Logged in as ${user.email}`);
//   } else {
//     console.log("No user");
//   }
// });
