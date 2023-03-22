/* eslint-disable */
import { signIn, loginGoogle, authStateChanged, userLogged  } from '../../firebase/auth.js';
import { showErrorMessage } from '../errorHandling.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const template = `
    <div class= "form-wrapper">
      <div class= "div-logo">
      <div>
        <img src="./assets/logo-icon.png" id="ada-icon" class="logo-icon" alt="icone da ConectAda">
        </div>
        <div>
        <img src="./assets/conectadas-logo.png" id="ada-logo" class="logo-image" alt="logo da ConectAda">
        </div>
      </div>
      <div>
        <label id='error-label' class='label-error'></label>
      </div> 
      <form>
        <div>
          <input type="email" name="email" id="email" class="input" placeholder="Digite seu e-mail">
          <div class="error" id="email-required-error" >E-mail é obrigatório</div>
          <div class="error" id="email-invalid-error">E-mail é inválido</div>
        </div>

        <div>
          <input type="password" name="password" id="password" placeholder="Digite sua senha" class="input" >
          <div class="error" id="password-required-error">Senha obrigatória</div>
        </div>

        <div>
          <button type="button" id="login-button" href="#timeline" class="button">Entrar</button>
        </div>

        <div class="google-div">
          <button type="button" id="google-button" class="google-btn">
          <p>ou continue com o</p> 
          <img src="./assets/googleLogoPB.png" class="google-logo" alt="logo do Google">
          </button>
        </div>

        <div class="register-div">
          <p>Não tem uma conta?</p>
          <a id="register-link" href="#register">Registre-se</a>        
        </div> 
      </form>
    </div>
  `;

  container.innerHTML = template; 
  
  const loginButton = container.querySelector('#login-button');
  const emailInput = container.querySelector('#email');
  const passwordInput = container.querySelector('#password');
  const loginWithGoogle = container.querySelector('#google-button');
  const errorLabel = container.querySelector('#error-label');

  loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email !== '' && password !== '') {
      signIn(email, password)
        .then((isAuthenticated) => {
          console.log(isAuthenticated);
          window.location.replace('#timeline');    
        })
        .catch((error) => {
          console.log(error);
          showErrorMessage(error);
          window.location.replace('#login');
        })
        .finally(() => {
          console.log('Processo de autenticação finalizado em login.');
        });
      }
    else {
      errorLabel.innerHTML = 'Preencha todos os campos';
    }
  });

  loginWithGoogle.addEventListener('click', () => {
    loginGoogle()
      .then((isAuthenticated) => {
        console.log('google: Usuário autenticado em login!');
        window.location.replace('#timeline');
      })
      .catch ((error) => {
        console.log('google: Usuário não autenticado.');
        window.location.replace('#login');
      })
      .finally(() => {
        console.log('Processo de autenticação do google  finalizado em login.');
      });
  });  

  return container;
};

authStateChanged();