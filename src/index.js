import './firebase/firebase.js';
import login from './pages/login/login.js';
import cadastro from './pages/cadastro/cadastro.js';
import feed from './pages/feed/feed.js';
import sobre from './pages/sobre/sobre.js';
// import { checkUserLogin } from './firebase/auth.js';

const main = document.querySelector('#root');

window.addEventListener('hashchange', () => {
  main.innerHTML = '';
  switch (window.location.hash) {
    case '':
      main.appendChild(login());
      break;
    case '#login':
      main.appendChild(login());
      break;
    case '#cadastro':
      main.appendChild(cadastro());
      break;
    case '#feed':
      main.appendChild(feed());
      break;
    case '#sobre':
      main.appendChild(sobre());
      break;
    default:
      main.appendChild(login());
  }
});
// const redirectUserAuthentication = (isAuthenticated) => {
//   console.log(isAuthenticated);
//   if (isAuthenticated) {
//     window.location.hash = '#feed';
//   }
//   else {
//     window.location.hash = '#login';
//   }
// };

window.addEventListener('load', () => {
  main.appendChild(login());
  // checkUserLogin(redirectUserAuthentication);
});
