import { userLogin, googleLogin } from '../../firebase/auth.js';
import { errorMessages, validationLogin } from '../../firebase/error.js';

export default () => {
  const loginContainer = document.createElement('div');

  const loginScreen = `
  <section id='desktop'> 
    <section id='login-content-desktop'>
      <div id='background-orange'> <br> <br>
        <h2 id='welcome'> Bem vindo (a) ! <br> <br> </h2> <hr id='line'> <br> <br> <br> <br>
           <p id='quality'> "A sua qualidade de vida é como um <span>bumerangue</span>, precisa ter movimento. <br> Todas as ações que você lançar, <br> voltarão em sua direção ainda mais fortes." </p> <br> <br>
      <h2 id='actions'> Melhore suas ações, <br> pratique atividade física! </h2>
       </div>
      </section> 
      <section class='login-container'>
      <figure> <img src='assets/imagens/logo.png' id='login-logo' alt='Logotipo QA- Qualidade de ações'> </figure>
      <input class='padding-inputs' id='email' name='email' type='email' placeholder='E-MAIL' required/> 
      <input class='padding-inputs' id='password' name='password' type='password' placeholder='SENHA' > 
      <button id='enter-button'> ENTRAR </button>
      <p id='error-login'> </p>
      <p id='or-google'>ou</p> 
      <p id='login-google'>Faça login com sua conta </p><img src='assets/imagens/google.png' alt='Imagem google' id='image-google'> 
      <p id='google-account'> Não tem uma conta? </p>
      <span id='register'> CADASTRE-SE </span>
      <br><br>
    <footer> <strong> © BOOMERANG </strong> </footer>
    </section>
    </section>
  `;
  loginContainer.innerHTML = loginScreen;

  const buttonEnter = loginContainer.querySelector('#enter-button');
  const buttonGoogle = loginContainer.querySelector('#image-google');
  const inputEmail = loginContainer.querySelector('#email');
  const inputPassword = loginContainer.querySelector('#password');
  const errorMessage = loginContainer.querySelector('#error-login');
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
