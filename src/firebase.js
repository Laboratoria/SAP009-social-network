// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore} from 'firebase/'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDIYlqYI_G6ucr-Kq3tFC0lE69LJ5lr4Ts",
  authDomain: "code-girls-35638.firebaseapp.com",
  projectId: "code-girls-35638",
  storageBucket: "code-girls-35638.appspot.com",
  messagingSenderId: "123433307591",
  appId: "1:123433307591:web:5728eb81118ae6f3bfdde2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



const provider = new firebase.auth.GoogleAuthProvider();  //criar uma instância do provedor

firebase.auth().signInWithPopup(provider) //Metodo de autenticacao atraves da janela dentro do proprio sistema

firebase.auth().signInWithPopup(provider).then(result => {  //Tratamento da resposta do login através da pop-up:
  const token = result.credential.accessToken;
  const user = result.user;
}).catch(error => {
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.email;
  const credential = error.credential;
});

