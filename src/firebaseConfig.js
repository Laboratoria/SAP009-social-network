// Este es el punto de entrada de tu aplicacion

  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
  import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
  //import {getAuth } from '/firebase/compat/auth'; 
  
  const firebaseApp = initializeApp({
    apiKey: "AIzaSyDxT35_dol3gw5dunaZUvJN4CuxkFXRnrI",
    authDomain: "social-network-5b156.firebaseapp.com",
    projectId: "social-network-5b156",
    storageBucket: "social-network-5b156.appspot.com",
    messagingSenderId: "536395370159",
    appId: "1:536395370159:web:92d72ff9a0d0b06f8e4e5a",
    measurementId: "G-QHVCCK6HZ4",
  });
    const auth = getAuth(firebaseApp);
  
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log('Logged in as ${user.email}' );
      } else {
        console.log('No user');
      }
    });

    

    export {onAuthStateChanged};