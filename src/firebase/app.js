// importação que inicializa o app criado no site do firebase

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

// variavel que recebe o aplicativo inicializado
// exportacao do app para ser usado em outras páginas
export const app = initializeApp(firebaseConfig);
