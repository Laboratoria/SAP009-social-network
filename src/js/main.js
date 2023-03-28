import home from './pages/home.js';

const main = document.querySelector('#root');

/* window.addEventListener('load', () => {
  main.appendChild(headerInitial());
}); */
window.addEventListener('load', () => {
  main.appendChild(home());
});
/* window.addEventListener('load', () => {
  main.appendChild(footer());
});
 */

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
