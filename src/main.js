import registro from "./pages/registro/registro.js";
import login from "./pages/login/login.js";
import redefinirSenha from "./pages/redefinir-senha/redefinir-senha";
import feed from "./pages/feed/feed";

const main = document.querySelector("#root")
const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = "";
        switch (window.location.hash) {
            case " ":
                main.appendChild(login());
                break;
            case "#login":
                main.appendChild(login());
                break;
            case "#redefinir-senha":
                main.appendChild(redefinirSenha());
                break;
            case "#registro":
                main.appendChild(registro());
                break;
            case "#feed":
                main.appendChild(feed());
                break;
        }
        inputsRequired()
        // "método padrão HTMl para chamar os inputs com required e exibir mensagem"
    })
}

window.addEventListener("load", () => {
    main.appendChild(login());
    init()
})
// para requisitar preenchimento de dados corretos no input


