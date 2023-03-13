import login from './pages/login/login.js';
import cadastro from './pages/cadastro/cadastro.js';
import postagem from './pages/postagem/postagem.js';

const main = document.querySelector('#main');

const iniciaTela = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
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
};

window.addEventListener('load', () => {
  main.appendChild(login());
  iniciaTela();
});
