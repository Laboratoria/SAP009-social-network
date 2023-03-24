import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD6gfUeqRQFZaJQ2UDvkziJ7sYU-1oTFVc',
  authDomain: 'brulle-2c8c1.firebaseapp.com',
  projectId: 'brulle-2c8c1',
  storageBucket: 'brulle-2c8c1.appspot.com',
  messagingSenderId: '1036171396591',
  appId: '1:1036171396591:web:9d114e594e3fcfea1b221a',
  measurementId: 'G-DTYHMXZSBC',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
