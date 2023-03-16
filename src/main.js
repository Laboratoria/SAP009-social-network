import home from './pages/home/index.js';
import publicar from './pages/publicar/index.js';
import login from './pages/login/index.js';
import register from './pages/cadastrar/index.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = ' ';
    switch (window.location.hash) {
      case '/':
        main.appendChild(login());
        break;
      case '#Publicar':
        main.appendChild(publicar());
        break;
      case '#Home':
        main.appendChild(home());
        break;
      case '#Sair':
        main.appendChild(login());
        break;
      case '#Register':
        main.appendChild(register());
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
