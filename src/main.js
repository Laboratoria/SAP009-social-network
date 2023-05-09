import Home from './pages/Home/home.js';
import Cadastro from './pages/Cadastro/cadastro.js';
import Feed from './pages/Feed/feed.js';

const main = document.querySelector('#root');
const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#home':
        main.appendChild(Home());
        break;
      case '#cadastro':
        main.appendChild(Cadastro());
        break;
      case '#feed':
        main.appendChild(Feed());
        break;
      default:
        main.appendChild(Home());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(Home());
  init();
});
