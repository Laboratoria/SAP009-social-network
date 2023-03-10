import login from './pages/login/login.js';
// import cadastro from './pages/cadastro/cadastro.js';
import postagem from './pages/postagem/postagem';

const main = document.querySelector('#main');

const exibirLogin = () => {
  main.appendChild(login());
};

exibirLogin();

const exibirPostagem = () => {
  main.appendChild(postagem());
};

exibirPostagem();
