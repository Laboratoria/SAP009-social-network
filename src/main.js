import registro from './pages/registro/registro.js';
import login from './pages/login/login.js';
import redefinirSenha from './pages/redefinir-senha/redefinir-senha';
import feed from './pages/feed/feed';

const main = document.querySelector('#root');
const init = () => {
  switch (window.location.hash) {
    case ' ':
      main.appendChild(login());
      break;
    case '#login':
      main.appendChild(login());
      break;
    case '#redefinirSenha':
      main.appendChild(redefinirSenha());
      break;
    case '#registro':
      main.appendChild(registro());
      break;
    case '#feed':
      main.appendChild(feed());
      break;
    default: main.appendChild(login());
  }
};
const executaHash = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    init();
  });
};
window.addEventListener('load', () => {
  init();
  executaHash();
});
// para requisitar preenchimento de dados corretos no input
