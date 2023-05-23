import login from './pages/login/login.js';
import register from './pages/register/register.js';
import feed from './pages/feed/feed.js';

const main = document.querySelector('#root');

const init = async () => {
  switch (window.location.hash) {
    case '':
      main.appendChild(login());
      break;
    case '#login':
      main.appendChild(login());
      break;
    case '#register':
      main.appendChild(register());
      break;
    case '#feed':
      main.appendChild(await feed());
      break;
    default:
      main.appendChild(login());
  }
};

window.addEventListener('load', () => {
  init();
});

window.addEventListener('hashchange', () => {
  main.innerHTML = '';
  init();
});
