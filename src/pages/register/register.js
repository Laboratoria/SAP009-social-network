import { createUser } from '../../firebase/auth.js';
import { validateRegister } from '../../firebase/error.js';

export default () => {
  const registerContainer = document.createElement('div');

  const registerScreen = `
  <section id='register-content-desktop'>
    <img src='assets/imagens/logout.png' alt='Botão sair' id='image-logout'>  
  <h2 id='register'> Cadastre-se </h2> 
  </section> 
  <section class='register-container'>  
  <figure> <img src='assets/imagens/logo.png' id='register-logo' alt='Logotipo QA- Qualidade de ações'> </figure>
    <form>
    <label class='registration-description' for='nome'> NOME COMPLETO </label>
    <input class='registration-content' id='register-name' name='nome' required> 
    <label class='registration-description' for='email'> E-MAIL </label>
    <input type='email' class='registration-content' id='register-email' name='email' required> 
    <label class='registration-description' for='register-password'> NOVA SENHA </label>
    <input type='password' class='registration-content' id='register-password' name='register-password' required> 
    <label class='registration-description' for='confirm-password'> CONFIRMAR SENHA </label>
    <input type='password' class='registration-content' id='confirm-password' name='confirm-password' required> 
    </form>
    <button id='register-button' > CRIAR CONTA </button> 
    <p id='error'></p>
    <p id='google-account'> Já tem uma conta? </p>
    <span id='registerlogin-init'>      ACESSE AQUI </span>
    <p id='confirmation-message'> </p>
  <footer> <strong> © BOOMERANG </strong> </footer>
  </section>
  `;
  registerContainer.innerHTML = registerScreen;

  const registerlog = registerContainer.querySelector('#registerlogin-init');
  registerlog.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
  });

  const buttonRegister = registerContainer.querySelector('#register-button');
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funcioneio');
    const inputName = registerContainer.querySelector('#register-name');
    const inputEmail = registerContainer.querySelector('#register-email');
    const inputPassword = registerContainer.querySelector('#register-password');
   
    const errorMessage = registerContainer.querySelector('#error');
    const inputConfirmPassword = registerContainer.querySelector('#confirm-password');
    const createLogin = validateRegister(inputName.value, inputEmail.value, inputPassword.value, inputConfirmPassword.value);
    if (inputName.value !== '' && inputEmail.value !== '' && inputPassword.value !== '' && inputConfirmPassword.value === inputPassword.value) {
      createUser(inputName.value, inputEmail.value, inputPassword.value)
        .then(() => {
          errorMessage.innerHTML = 'CADASTRO REALIZADO COM SUCESSO!'+inputName+'&#x2705 <br> Agora, faça o login para entrar!';
          window.location.hash = '#login';
        })
        .catch(() => {
          errorMessage.innerHTML = createLogin;
        });
    } else {
      errorMessage.innerHTML = createLogin;
    }
  });

  return registerContainer;
};
