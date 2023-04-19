import { createUser } from '../../firebase/auth.js';
import { errorMessages, validateRegister } from '../../firebase/error.js';

export default () => {
  const registerContainer = document.createElement('div');

  const registerScreen = `
  <section class='register-container-new'>
  <figure> <img src='assets/imagens/logo.png' id='register-logo' alt='Logotipo QA- Qualidade de ações'> </figure> <br> <br>
  <h2 id='register-new'> Cadastre-se </h2>
    <form>
    <label class='registration-description' for='nome'> NOME COMPLETO </label>
    <input class='registration-content' id='register-name' name='nome' required>
    <label class='registration-description' for='email'> E-MAIL </label>
    <input type='email' class='registration-content' id='register-email' name='email' required>
    <label class='registration-description' for='register-password'> NOVA SENHA </label>
    <input type='password' class='registration-content' id='register-password' name='register-password' required>
    <label class='registration-description' for='confirm-password'> CONFIRMAR SENHA </label>
    <input type='password' class='registration-content' id='confirm-password' name='confirm-password' required>
    </form><br>
    <button id='register-button' > CRIAR CONTA </button> <br>
    <p id='error-register'></p>
    <p id='confirmation-message'> </p> <br>
    <p id='google-account-register'> Já tem uma conta? </p>
    <span id='register-login-init'> ACESSE AQUI </span><br><br>
  <footer> <strong> © BOOMERANG </strong> </footer>
  </section
  `;
  registerContainer.innerHTML = registerScreen;

  const registerlog = registerContainer.querySelector('#register-login-init');
  registerlog.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
  });

  const buttonRegister = registerContainer.querySelector('#register-button');
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    const inputName = registerContainer.querySelector('#register-name');
    const inputEmail = registerContainer.querySelector('#register-email');
    const inputPassword = registerContainer.querySelector('#register-password');
    const inputConfirmPassword = registerContainer.querySelector('#confirm-password');
    const errorMessage = registerContainer.querySelector('#error-register');
    const confirmationMessage = registerContainer.querySelector('#confirmation-message');

    // eslint-disable-next-line max-len
    const createLogin = validateRegister(inputName.value, inputEmail.value, inputPassword.value, inputConfirmPassword.value);
    if (inputName.value !== '' && inputEmail.value !== '' && inputPassword.value !== '' && inputConfirmPassword.value === inputPassword.value) {
      createUser(inputEmail.value, inputPassword.value)
        .then(() => {
          confirmationMessage.innerHTML = `OLÁ ${inputName.value}!!! <br> SEU CADASTRO FOI REALIZADO COM SUCESSO! &#x2705 <br> Agora, faça o login para entrar!`;
        })
        .catch((error) => {
          errorMessage.innerHTML = errorMessages(error);
        });
    } else {
      errorMessage.innerHTML = createLogin;
    }
  });

  return registerContainer;
};
