// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCXzj5MfGytnQSWwjsq5VKWlEfyc6Z6AMg',
  authDomain: 'social-network-69ad3.firebaseapp.com',
  projectId: 'social-network-69ad3',
  storageBucket: 'social-network-69ad3.appspot.com',
  messagingSenderId: '299175801388',
  appId: '1:299175801388:web:21026ac0c0be9396261789',
};

export const app = initializeApp(firebaseConfig);
