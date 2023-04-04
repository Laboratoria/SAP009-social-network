import headerInitial from './components/headers/header-initial.js';
import headerLogin from './components/headers/header-login.js';
import footer from './components/footer.js';
import home from './pages/home.js';
import login from './pages/login.js';
import signUp from './pages/sign-up.js';
import feed from './pages/feed.js';

const main = document.querySelector('#root');
const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#home':
        main.appendChild(headerInitial());
        main.appendChild(home());
        main.appendChild(footer());
        break;
      case '#login':
        main.appendChild(headerLogin());
        main.appendChild(login());
        main.appendChild(footer());
        break;
      case '#signup':
        main.appendChild(headerInitial());
        main.appendChild(signUp());
        main.appendChild(footer());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      default:
        window.location.hash = '#home';
        main.appendChild(headerInitial());
        main.appendChild(home());
        main.appendChild(footer());
    }
  });
};

window.addEventListener('load', () => {
  window.location.hash = '#home';
  main.appendChild(headerInitial());
  main.appendChild(home());
  main.appendChild(footer());
  init();
});
