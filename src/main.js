import login from './pages/login/login.js';
import cadastro from './pages/cadastro/cadastro.js';
import feed from './pages/feed/feed.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#login':
        main.appendChild(login());
        break;
      case '#cadastro':
        main.appendChild(cadastro());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      default:
        main.appendChild(login());
        break;
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});
