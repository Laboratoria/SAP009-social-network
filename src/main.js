// import { createUserWithEmailAndPassword } from './firebase/auth.js'
import { load } from './pages/login/login.js';

const main = document.querySelector('#root');

window.addEventListener('load', () => {
  main.appendChild(load());
  
});



