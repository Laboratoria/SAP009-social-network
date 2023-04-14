/* eslint-disable no-unused-vars */
// neste arquivo se concentram as funções relativas ao funcionamento da página SPA.
import login from './pages/login/login.js';
import cadastro from './pages/cadastro/cadastro.js';
import postagem from './pages/postagem/postagem.js';
import { observador } from './firebase/firebase-auth.js';

const main = document.querySelector('#main');

window.addEventListener('hashchange', () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#login':
      main.appendChild(login());
      break;
    case '#cadastro':
      main.appendChild(cadastro());
      break;
    case '#postagem':
      main.appendChild(postagem());
      break;
    default:
      main.appendChild(login());
  }
});

const redirectLoggedUser = (isLogged) => {
  if (isLogged) {
    window.location.hash = '#postagem';
  } else {
    window.location.hash = '#login';
  }
};

window.addEventListener('load', () => {
  // console.log('main aqui');

  observador(redirectLoggedUser);
});
