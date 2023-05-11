// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDLEjBssztFVEWkvlFNpY2DoRL8VcE_lrU',
  authDomain: 'rede-social-97144.firebaseapp.com',
  projectId: 'rede-social-97144',
  storageBucket: 'rede-social-97144.appspot.com',
  messagingSenderId: '656753278936',
  appId: '1:656753278936:web:8e7a15fc0a546e1ea67cad',
  measurementId: 'G-42PJCBY3D3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
