import registro from './pages/registro/registro.js';
import login from './pages/login/login.js';
import redefinirSenha from './pages/redefinir-senha/redefinir-senha';
import feed from './pages/feed/feed';
import { redirecionarPagina } from './redirecionar-pagina'
import { verificaUsuarioLogado } from './firebase/firebase.js';

const main = document.querySelector('#root');

const init = async () => {
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
      main.appendChild(await feed());
      break;
    default: main.appendChild(login());
  }
};

// função p/ verificar se o usuario existe, se existir manda p/ o feed
//se não existir manda p/ o loggin
const redirecionaUsuarioLogado = (user) => {
  if (user) {
    redirecionarPagina('#feed');
  } else {
    redirecionarPagina('');
  }
}

const executaHash = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    init();
  });
};

window.addEventListener('load', () => {
  verificaUsuarioLogado(redirecionaUsuarioLogado);
  // chamando o verifica que tá no firebase, chamando como parametro
  //o redireciona..
  executaHash();
});
