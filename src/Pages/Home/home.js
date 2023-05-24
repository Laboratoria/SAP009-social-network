import { signIn, validateEmail } from '../../lib/login-firebase.js';

export function home() {
  const container = document.createElement('div');
  container.id = 'container'
  container.innerHTML = `  
  <h2>LOGIN</h2>
  <div>
      <label for="usuario">E-mail</label>
      <input type="text" name="e-mail" placeholder="Digite seu e-mail" id="inputEmail">

  
      <label for="senha">Senha</label>
      <input id="password" type="password" name="senha" placeholder="Digite sua senha">
  </div>   
 
  <button id="signin-button" class="botaologin">ENTRAR</button>
  <button id="cadastro">Faça seu cadastro</button>             

<section id = "loginError"></section>
<section id = "singIn"></section>
`;

  const registerButton = container.querySelector("#cadastro");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.hash = "cadastro";
  });

  const email = container.querySelector("#inputEmail");
  const password = container.querySelector("#password");
  const loginError = container.querySelector("#loginError");
  const signInButton = container.querySelector("#signin-button");

  signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (email.value) {
      signIn(email.value, password.value)
        .then(() => {
          window.location.hash = "timeline";
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "email-already-in-use") {
            loginError.innerHTML = "Não há registro de usuário correspondente a este e-mail";
          } else if (errorCode === "auth/wrong-password") {
            loginError.innerHTML = "Senha inválida";
          }
        });
    } else {
      loginError.innerHTML = "Preencha o campo de E-mail";
    }
  });

  return container}
