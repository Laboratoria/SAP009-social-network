// importação que inicializa o app que criamos no site do firebase

// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// nossas credenciais do site firebase e do aplicativo que criamos
const firebaseConfig = {
  apiKey: 'AIzaSyDxT35_dol3gw5dunaZUvJN4CuxkFXRnrI',
  authDomain: 'social-network-5b156.firebaseapp.com',
  projectId: 'social-network-5b156',
  storageBucket: 'social-network-5b156.appspot.com',
  messagingSenderId: '536395370159',
  appId: '1:536395370159:web:92d72ff9a0d0b06f8e4e5a',
  measurementId: 'G-QHVCCK6HZ4',
};

// variavel que recebe nosso aplicativo inicializado
// exportacao do nosso app para ser usado em outras páginas
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
