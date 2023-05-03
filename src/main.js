import { home } from "./Pages/Home/home.js";
import { cadastro } from "./Pages/Cadastro/cad.js";
import { timeline } from "./Pages/TimeLine/time.js";

const main = document.getElementById('root')
const init = () => {
    window.addEventListener("hashchange", () => {
        switch (window.location.hash) {
            case "#":
                main.replaceChildren(home());
                break;
            case "#cadastro":
                main.replaceChildren(cadastro());
                break;
            case "#timeline":
                main.replaceChildren(timeline());
                break;
            default:
                main.replaceChildren(home());
        }
    })
}


window.addEventListener("load", () => {
    main.appendChild(home());
    init();
})



