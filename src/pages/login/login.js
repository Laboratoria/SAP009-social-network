import { signIn, loginGoogle } from '../../firebase/auth.js';
import { errorsFirebase, validateLogin } from '../../validations';
import { redirect } from '../../redirect.js';
import logo from '../../images/logo.png';
import googleLogo from '../../images/google-logo.png';

export default () => {
  const containerLogin = document.createElement('div');

  const templateLogin = `
    <div class="form-wrapper">
      <img src='${logo}' id="logo" alt="Logo da Anime-se">

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
          <button type="button" id="google-button"><img src='${googleLogo}' id="google-logo" alt="logo do Google">Continue com o Google</button>
        </div>

        <p class="msg-error"></p>

        <div>
          <button type="button" id="register-button">Não tem uma conta? <a id="register-link" href="#register">Registre-se</a></button>
        </div> 
      </form>
    </div>
  `;

  containerLogin.innerHTML = templateLogin;

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
        redirect('#timeline');
        window.location.reload();
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        redirect('#login');
      });
  });

  return containerLogin;
};
