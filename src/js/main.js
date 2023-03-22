/* import headerInitial from './components/headers/header-initial.js';
import footer from './components/footer.js'; */
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
