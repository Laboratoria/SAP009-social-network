import login from './login/login.js';
import register from './register/register.js';
import feed from './feed/feed.js';
import publish from './publish/publish.js';

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
