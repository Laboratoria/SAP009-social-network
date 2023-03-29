import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
