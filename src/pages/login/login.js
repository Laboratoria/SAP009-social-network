import { userLogin, googleLogin } from '../../firebase/auth.js';
import { errorMessages, validationLogin } from '../../firebase/error.js';

export default () => {
  const loginContainer = document.createElement('div');

  const loginScreen = `
  <section id='login-content-desktop'

    <section id='background-orange'>
      <h2 id='welcome'> Bem vindo (a) !</h2>
      <p id='quality'> 'A sua qualidade de vida é como um <span>bumerangue</span>, precisa ter movimento. Todas as ações que você lançar, voltarão em sua direção ainda mais fortes.' </p>
      <p id='actions'> Melhore suas ações, pratique atividade física! </p>
      </section>

      <section class='login-container'>
      <figure> <img src='assets/imagens/logo.png' id='login-logo' alt='Logotipo QA- Qualidade de ações'> </figure>
      <input class='padding-inputs' id='email' type='email' placeholder= 'E-MAIL'> </input>
      <input class='padding-inputs' id='password' type='password' placeholder= 'SENHA'> </input>
      <p id='error'></p>

      <button id= 'enter-button' type='button'> <h2 id='enter'> ENTRAR </h2> </button>

      <p id= 'or-google'> <strong> OU </strong> </p>
      <p class='login-google'> Faça login com sua conta </p> 
      <button type='button'> <img src='assets/imagens/google.png' alt='Imagem google' id='image-google'> </button>
      <p class='google-account'> Não tem uma conta? </p> 
      <button type='button' id='register-link'> <h2 id='register'> CADASTRE-SE </h2>      </button>

    <footer> <strong> © BOOMERANG </strong> </footer>

    </section>
    </section>
  `;

  loginContainer.innerHTML = loginScreen;

  const buttonEnter = loginContainer.querySelector('#enter-button');
  const buttonGoogle = loginContainer.querySelector('#image-google');
  const inputEmail = loginContainer.querySelector('#email');
  const inputPassword = loginContainer.querySelector('#password');
  const errorMessage = loginContainer.querySelector('#error');
  const signUp = loginContainer.querySelector('#register');

  buttonEnter.addEventListener('click', (event) => {
    event.preventDefault();
    const validateLogin = validationLogin(inputEmail.value, inputPassword.value);
    if (validateLogin === '') {
      userLogin(inputEmail.value, inputPassword.value)
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch((error) => {
          errorMessage.innerHTML = errorMessages(error);
        });
    } else {
      errorMessage.innerHTML = validateLogin;
    }
  });

  buttonGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    googleLogin()
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => error);
  });

  signUp.addEventListener('click', () => {
    window.location.hash = '#register';
  });

  return loginContainer;
};
