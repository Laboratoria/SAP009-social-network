import login from './pages/login/login.js';

const main = document.querySelector('#main');

const exibirLogin = () => {
  // const paginaLogin = login();

  main.appendChild(login());
};

exibirLogin();
