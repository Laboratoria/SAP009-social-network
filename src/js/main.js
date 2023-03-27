import home from './pages/home.js';
import headerInitial from './components/headers/header-initial.js';
import footer from './components/footer.js';
import signUp from './pages/sign-up.js';

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
      // case '#login':
      //   main.appendChild(login());
      //   break;
      case '#signup':
        main.appendChild(headerInitial());
        main.appendChild(signUp());
        main.appendChild(footer());
        break;
      default:
        main.appendChild(headerInitial());
        main.appendChild(home());
        main.appendChild(footer());
    }
  });
};
window.addEventListener('load', () => {
  main.appendChild(headerInitial());
  main.appendChild(home());
  main.appendChild(footer());
  init();
});



