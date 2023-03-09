// import { createUserWithEmailAndPassword } from './firebase/auth.js'
import login from './pages/login/login.js';

const main = document.querySelector('#root');

window.addEventListener('load', () => {
  main.appendChild(login());
});