// Este es el punto de entrada de tu aplicacion

import login from "./pages/login/index.js";

const main = document.querySelector("#root");

window.addEventListener("load", () => {
    main.appendChild(login());
})
