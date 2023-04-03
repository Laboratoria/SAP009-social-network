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
    case '#about':
      main.appendChild(about());
      break;
    case '#timeline':
      checkLoggedUser(async (logged) => {
        if (logged) {
          main.appendChild(await timeline());
        }
      });
      break;
    default:
      main.appendChild(login());
  }
};

window.addEventListener('load', renderPage);
window.addEventListener('hashchange', renderPage);

/*
import login from './pages/login/login';
import register from './pages/register/register';
import { timeline } from './pages/timeline/timeline';
import post from './pages/timeline/posts';
import { checkLoggedUser } from './firebase/auth.js';
import { redirect } from './redirect.js';

const main = document.querySelector('#root');

const redirectLogUser = (user) => {
  if (user) {
    redirect('#timeline');
    console.log(user);
  } else {
    redirect('');
  }
};

const renderPage = () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '':
      main.appendChild(login());
      break;
    case '#register':
      main.appendChild(register());
      break;
    case '#timeline':
      checkLoggedUser(async (logged) => {
        if (logged) {
          main.appendChild(await timeline());
        } else {
          main.appendChild(login());
        }
      });
      break;
    case '#post':
      main.appendChild(post());
      break;
    default:
      main.appendChild(login());
  }
};

window.addEventListener('load', () => {
  checkLoggedUser(redirectLogUser);
});

window.addEventListener('hashchange', renderPage);
*/
