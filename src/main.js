// import { createUserWithEmailAndPassword } from './firebase/auth.js'
import login from './pages/login/login.js';
import timeline from './pages/timeline/timeline.js';
import register from './pages/register/register.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '#login':
        main.appendChild(login());
        break;
      case '#timeline':
        main.appendChild(timeline());
        break;
      case '#register':
        main.appendChild(register());
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
