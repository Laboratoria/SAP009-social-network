// neste arquivo se concentram as funções relativas ao funcionamento da página SPA.
import login from './pages/login/login.js';
import cadastro from './pages/cadastro/cadastro';
import postagem from './pages/postagem/postagem.js';
import { observador } from './firebase/firebase.js';

const main = document.querySelector('#main');

const iniciaTela = async () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '':
      main.appendChild(login());
      break;
    case '#cadastro':
      main.appendChild(cadastro());
      break;
    case '#postagem':
      main.appendChild(await postagem());
      break;
    default:
      console.log('default');
      main.appendChild(login());
      break;
  }
};

window.addEventListener('hashchange', async () => {
  console.log('evento hashchannge');
  await iniciaTela();
});

window.addEventListener('load', async () => {
  console.log('evento load');
  observador(async (user) => {
    console.log(user);
    if (user) {
      // verifica se usuario ta logado, se tiver ele chama init p/ carregar a pag q está
      await iniciaTela();
    } else {
      // se nao tiver logado, manda p/ o login
      window.location.hash = '#login';
    }
  });
});
