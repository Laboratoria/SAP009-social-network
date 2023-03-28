// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC3qBNl0x8mvW_8i4cANa7Puu_dNgFtvp4',
  authDomain: 'maesevinhos-b065f.firebaseapp.com',
  projectId: 'maesevinhos-b065f',
  storageBucket: 'maesevinhos-b065f.appspot.com',
  messagingSenderId: '1049441455311',
  appId: '1:1049441455311:web:16a274704bd6fea3eefbba',
  measurementId: 'G-MDYYFSC961',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// TODO: Replace the following with your app's Firebase project configuration (pertence a storage)
// See: https://support.google.com/firebase/answer/7015592

// Initialize Cloud Firestore and get a reference to the service export const db = getFirestore(app);
