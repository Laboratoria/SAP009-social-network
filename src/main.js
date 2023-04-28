import { Home } from './pages/home/home.js';
import { Cadastro } from './pages/cadastro/cadastro.js';
import { Feed } from './pages/feed/feed.js';

const main = document.getElementById('root');
const init = () => {
  window.addEventListener("hashchange", () => {
    console.log(window.location.hash);
    main.innerHTML = ""; //impede que a página se repita
    switch(window.location.hash){
      case "#":
        main.appendChild(Home());
        break;
      case "#cadastro":
        main.appendChild(Cadastro());
        break;
      case "#feed":
        main.appendChild(Feed());
        break;
      default:
        main.appendChild(Home()); 
    }
  })
}

window.addEventListener("load", () => {
  main.appendChild(Home());
  init();
})
