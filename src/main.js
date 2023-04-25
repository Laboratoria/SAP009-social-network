import login from './pages/login/index.js';
import cadastro from './pages/cadastro/index.js';
import feed from './pages/feed/index.js';

const main = document.querySelector('#root');
const renderiza = () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '':
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
};

window.addEventListener('hashchange', renderiza);

window.addEventListener('load', renderiza);
