// import { myFunction } from '../lib/index.js';
import headers from './components/headers/header-initial';

const main = document.querySelector('#root');

window.addEventListener('load', () => {
  main.appendChild(headers());
});

// myFunction();
