// aqui exportaras las funciones que necesites
//export const myFunction = () => {aqui tu codigo};

import home from "./pages/cadastro/home.js";

const main = document.querySelector("#root");

window.addEventListener("load", () => {
  main.appendChild(home());
});
