/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { signIn, loginGoogle } from '../../firebase/auth.js';
import { errorsFirebase, validateLogin } from '../../validations';
import { redirect } from '../../redirect.js';

export default () => {
  const containerLogin = document.createElement('div');

  const templateLogin = `
    <div class="form-wrapper">
      <img src="./assets/logo.png" id="logo" alt="Logo da Anime-se">

      <form>
        <div>
          <input type="email" name="email" id="email" placeholder="nome@email.com">
          <div class="error" id="email-required-error">E-mail é obrigatório</div>
          <div class="error" id="email-invalid-error">E-mail é inválido</div>
        </div> 

        <div>
          <input type="password" name="password" id="password" placeholder="senha">
          <div class="error" id="password-required-error">Senha obrigatória</div>
        </div>

        <div>
          <button type="button" id="login-button" href="#timeline">Login</button>
        </div>

        <p>ou</p>

        <div>
          <button type="button" id="google-button"><img src="./assets/google-logo.png" id="google-logo" alt="logo do Google">Continue com o Google</button>
        </div>

        <p class="msg-error"></p>

        <div>
          <button type="button" id="register-button">Não tem uma conta? <a id="register-link" href="#register">Registre-se</a></button>
        </div> 
      </form>
    </div>
  `;

  containerLogin.innerHTML = templateLogin;

  // Adiciona um listener de evento no botão de login
  const loginButton = containerLogin.querySelector('#login-button');
  const emailInput = containerLogin.querySelector('#email');
  const passwordInput = containerLogin.querySelector('#password');
  const loginWithGoogle = containerLogin.querySelector('#google-button');
  const errorMessage = containerLogin.querySelector('.msg-error');

  loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const validation = validateLogin(email, password);
    if (validation === '') {
      signIn(email, password)
        .then(() => {
          redirect('#timeline');
          window.location.reload();
        })
        .catch((error) => {
          const errorFirebase = errorsFirebase(error.code);
          errorMessage.innerHTML = errorFirebase;
        });
    } else {
      errorMessage.innerHTML = validation;
    }
  });

  loginWithGoogle.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        console.log('google: Usuário autenticado!');
        redirect('#timeline');
        window.location.reload();
      })
      .catch((error) => {
        console.log('google: Usuário não autenticado.');
        redirect('#login');
      });
  });

  return containerLogin;
};
