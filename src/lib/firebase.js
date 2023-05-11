// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB9RFAjw0v_NQ0GPBK6Df5_QeV_SPjQ1r4',
  authDomain: 'familycircle-7a559.firebaseapp.com',
  projectId: 'familycircle-7a559',
  storageBucket: 'familycircle-7a559.appspot.com',
  messagingSenderId: '632527441230',
  appId: '1:632527441230:web:76f03fc12f7b015a94e21f',
  measurementId: 'G-Y6V5ZM7DBD',
};
//  Inicializar o Firebase
const app = initializeApp(firebaseConfig);
// Inicializar a autenticação
const auth = getAuth();

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
