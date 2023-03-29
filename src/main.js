/* eslint-disable no-unused-vars */
// neste arquivo se concentram as funções relativas ao funcionamento da página SPA.
import login from './pages/login/login.js';
import cadastro from './pages/cadastro/cadastro.js';
import postagem from './pages/postagem/postagem.js';
import { mostraPostagens } from './firebase/firebase-storage.js';
import { async } from 'regenerator-runtime';
// import { imprimePosts } from './firebase/funcoes-acessorias.js';

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
  main.appendChild(postagem());
  // main.appendChild(login());
  iniciaTela();
  window.location.hash = '';
});

// window.addEventListener('DOMContentLoaded', () => {
//   console.log('pegando');

  // const querySnapshot = mostraPostagens();

  // imprimePosts(querySnapshot); // esta na função acessoria fazendo o foreach

  // quandoDadosForemAdicionados((querySnapshot) => {
  //   let posts = '';

  //   querySnapshot.forEach((doc) => {
  //     const descricao = doc.data();
  //     posts += descricao;
  //   });
  //   // aqui tinha que ficar o innerHTML = posts
  // });
// });

window.addEventListener('DOMContentLoaded', async () => {
  console.log('pegando');

  const querySnapshot = await mostraPostagens();

  // let posts = '';

  // querySnapshot.forEach((doc) => {
  //   const descricao = doc.data();
  //   posts += descricao;
  // });

  // postagensAnteriores.innerHTML += querySnapshot;
});
