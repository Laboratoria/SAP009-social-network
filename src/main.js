import login from './pages/login/login.js';
import cadastro from './pages/cadastro/cadastro.js';
import postagem from './pages/postagem/postagem.js';

const main = document.querySelector('#main');

const iniciaTela = () => {
  window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
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

// const iniciaPagina = () => {
//   window.addEventListener('hashchange', () => {
//     main.innerHTML = login();
//     switch (window.location.hash) {
//       case '#cadastro':
//         main.appendChild(cadastro());
//         // ASSIM MUDA DE PÁGINA
//         // break;
//       // case '#postagem':
//       //   main.appendChild(postagem());
//       //   break;
//     }
//   });
// };

// window.addEventListener('load', () => {
//   main.appendChild(login());
//   iniciaPagina();
// });

// const exibirLogin = () => {
//   main.appendChild(login());
// };
// exibirLogin();

// const exibirCadastro = () => {
//   main.appendChild(cadastro());
// };
// exibirCadastro();

// const exibirPostagem = () => {
//   main.appendChild(postagem());
// };
// exibirPostagem();
