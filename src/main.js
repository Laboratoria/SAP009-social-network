// Este es el punto de entrada de tu aplicacion
import login from './pages/login/login';
import feed from './pages/feed/feed.js';
import cadastro from './pages/cadastro/index.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
        main.appendChild(login());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      case '#cadastro':
        main.appendChild(cadastro());
        break;
      default:
        main.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});
