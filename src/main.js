// Este es el punto de entrada de tu aplicacion
import login from './pages/login/login';
import feed from './pages/feed/feed.js';
import cadastro from './pages/cadastro/index.js';
import { verificaUsuarioLogado } from './servicesFirebase/firebaseAuth';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
        console.log('login vazio');
        main.appendChild(login());
        break;
      case '#feed':
        console.log('feed entrei');
        main.appendChild(feed());
        break;
      case '#cadastro':
        main.appendChild(cadastro());
        break;
      default:
        console.log('login default');
        main.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  init();
});
window.addEventListener('load', async () => {
  verificaUsuarioLogado(async (idUser) => {
    if (idUser) {
    // verifica se usuario ta logado, se tiver ele chama init p/ carregar a pag q está
      window.location.hash = '#feed';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      // se nao tiver logado, manda p/ o login
      window.location.hash = '#login';
    }
  });
});
