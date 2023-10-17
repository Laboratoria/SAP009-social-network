import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDxT35_dol3gw5dunaZUvJN4CuxkFXRnrI',
  authDomain: 'social-network-5b156.firebaseapp.com',
  projectId: 'social-network-5b156',
  storageBucket: 'social-network-5b156.appspot.com',
  messagingSenderId: '536395370159',
  appId: '1:536395370159:web:92d72ff9a0d0b06f8e4e5a',
  measurementId: 'G-QHVCCK6HZ4',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
