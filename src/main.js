// Este es el punto de entrada de tu aplicacion

//import { myFunction } from './lib/index.js';

//myFunction();

import login from './login/login.js';

const main = document.querySelector('#root');

window.addEventListener('load', () => {
  main.appendChild(login());
});
