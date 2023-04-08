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
    <input class='registration-content' id='register-name' name='nome' required> </input>
    <label class='registration-description' for='email'> E-MAIL </label>
    <input class='registration-content' id='register-email' name='email' required> </input>
    <label class='registration-description' for='senha'> NOVA SENHA </label>
    <input class='registration-content' id='register-password' name='senha' required> </input>
    <label class='registration-description' for='confirmar-senha'> CONFIRMAR SENHA </label>
    <input class='registration-content' id='confirm-password' name='confirmar-senha' required> </input>
    </form>
    <p id='register-button'> CRIAR CONTA </p> 
    <p id='error'></p>
    <p id= confirmation-message> </p>
  <footer> <strong> © BOOMERANG </strong> </footer>
  </section>
  `;
  registerContainer.innerHTML = registerScreen;

  const register = registerContainer.querySelector('#register-logo');
  register.addEventListener('click', () => {
    window.history.back();
  });
  const buttonRegister = registerContainer.querySelector('#register-button');
  const confirmationMessage = registerContainer.querySelector('#confirmation-message');
  const errorMessage = registerContainer.querySelector('#error');

  buttonRegister.addEventListener('click', (event) => {
    event.preventDefault();
    const inputName = registerContainer.querySelector('#register-name');
    const inputEmail = registerContainer.querySelector('#register-email');
    const inputPassword = registerContainer.querySelector('#register-password');
    const inputConfirmPassword = registerContainer.querySelector('#confirm-password');

    // eslint-disable-next-line max-len
    const validationRegister = validateRegister(inputName.value, inputEmail.value, inputPassword.value, inputConfirmPassword.value);

    if (validationRegister !== '') {
      createUser(inputName.value, inputEmail.value, inputPassword.value, inputConfirmPassword.value)
        .then(() => {
          confirmationMessage.innerHTML = 'CADASTRO REALIZADO COM SUCESSO! &#x2705 <br> Agora, faça o login para entrar!';
          window.location.hash = '#feed';
        })
        .catch(() => {
          errorMessage.innerHTML = validationRegister;
        });
    }
  });

  return registerContainer;
};