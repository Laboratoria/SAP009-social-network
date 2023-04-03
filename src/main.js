import login from './pages/login/login.js';
import register from './pages/register/register.js';
import feed from './pages/feed/feed.js';
import publish from './pages/publish/publish.js';

const main = document.querySelector('#root');

const init = () => {
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
      main.appendChild(feed());
      break;
    case '#publish':
      main.appendChild(publish());
      break;
    case '#logout':
      main.appendChild(login());
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
