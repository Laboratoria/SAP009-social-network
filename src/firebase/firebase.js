// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDxT35_dol3gw5dunaZUvJN4CuxkFXRnrI',
  authDomain: 'social-network-5b156.firebaseapp.com',
  projectId: 'social-network-5b156',
  storageBucket: 'social-network-5b156.appspot.com',
  messagingSenderId: '536395370159',
  appId: '1:536395370159:web:92d72ff9a0d0b06f8e4e5a',
  measurementId: 'G-QHVCCK6HZ4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
