/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { signIn, loginGoogle } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
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

        <div>
          <button type="button" id="register-button">Não tem uma conta? <a id="register-link" href="#register">Registre-se</a></button>
        </div> 
      </form>
    </div>
  `;

  container.innerHTML = template;

  // Adiciona um listener de evento no botão de login
  const loginButton = container.querySelector('#login-button');
  const emailInput = container.querySelector('#email');
  const passwordInput = container.querySelector('#password');
  const loginWithGoogle = container.querySelector('#google-button');

  loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signIn(email, password)
      .then((isAuthenticated) => {
        console.log('Usuário autenticado!');
        window.location.replace('#timeline');
      })
      .catch((error) => {
        console.log('Usuário não autenticado.');
        window.location.replace('#login');
      })
      .finally(() => {
        console.log('Processo de autenticação finalizado em login');
      });
  });

  loginWithGoogle.addEventListener('click', () => {
    loginGoogle()
      .then((isLogged) => {
        console.log('google: Usuário autenticado!');
        window.location.replace('#timeline');
      })
      .catch((error) => {
        console.log('google: Usuário não autenticado.');
        window.location.replace('#login');
      })
      .finally(() => {
        console.log('Autenticação com o google finalizada em login');
      });
  });

  return container;
};
