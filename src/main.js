import login from './pages/login/login';
import register from './pages/register/register';
import timeline from './pages/timeline/timeline';
import about from './pages/about/about';
import { checkLoggedUser } from './firebase/auth.js';

const main = document.querySelector('#root');

const renderPage = () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '#login':
      main.appendChild(login());
      break;
    case '#register':
      main.appendChild(register());
      break;
    case '#timeline':
      checkLoggedUser(async (logged) => {
        if (logged) {
          main.appendChild(await timeline());
        }
      });
      break;
    case '#about':
      main.appendChild(about());
      break;
    default:
      main.appendChild(login());
  }
};

window.addEventListener('load', renderPage);
window.addEventListener('hashchange', renderPage);
