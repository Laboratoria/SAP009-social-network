// importação que inicializa o app criado no site do firebase

import { initializeApp } from 'firebase/app';

// credenciais do site firebase e do aplicativo que criado
const firebaseConfig = {
  apiKey: 'AIzaSyDc4KK7IGD7BdujiCKD-9PsyhpALWpVUbo',
  authDomain: 'conectadas-138d8.firebaseapp.com',
  projectId: 'conectadas-138d8',
  storageBucket: 'conectadas-138d8.appspot.com',
  messagingSenderId: '984687453325',
  appId: '1:984687453325:web:35de2f1ae5a2c7bc312ec4',
  measurementId: 'G-9P12LKT9TK',
};

// variavel que recebe o aplicativo inicializado
// exportacao do app para ser usado em outras páginas
export const app = initializeApp(firebaseConfig);
