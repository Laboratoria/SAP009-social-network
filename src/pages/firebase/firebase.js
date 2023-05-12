import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDHc5Sfgum92eW5dHdyUtZUyATfwFZCMxM',
  authDomain: 'social-network-6f67b.firebaseapp.com',
  projectId: 'social-network-6f67b',
  storageBucket: 'social-network-6f67b.appspot.com',
  messagingSenderId: '810034650302',
  appId: '1:810034650302:web:140814ff6fa21285c392ef',
  measurementId: 'G-30YYN58KVL',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
