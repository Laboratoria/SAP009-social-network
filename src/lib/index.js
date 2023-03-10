/* eslint-disable default-case */
import login from '../pages/login/login.js';
import inicio from '../pages/inicio/inicio.js';
import perfil from '../pages/perfil/perfil.js';
import publicar from '../pages/publicar/publicar.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case ' ':
        main.appendChild(login());
        break;
      case '#inicio':
        main.appendChild(inicio());
        break;
      case '#perfil':
        main.appendChild(perfil());
        break;
      case '#publicar':
        main.appendChild(publicar());
        break;
      case '#sair':
        main.appendChild(login());
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
