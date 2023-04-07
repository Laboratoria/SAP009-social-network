import { createUser } from '../../firebase/auth.js';
import { validateRegister } from '../../firebase/error.js';

export default () => {
  const registerContainer = document.createElement('div');

  const registerScreen = `
  <section class='register-container'>  
  <figure> <img src='assets/imagens/logo.png' id='register-logo' alt='Logotipo QA- Qualidade de ações'> </figure>
  <form>
    <label class='registration-description' for='nome'> NOME COMPLETO </label>
    <input type='text' class='registration-content' id='register-name' name='nome' required> </input>
    <label class='registration-description' for='email'> E-MAIL </label>
    <input type='email' class='registration-content' id='register-email' name='email' required> </input>
    <label class='registration-description' for='senha'> NOVA SENHA </label>
    <input type='password' class='registration-content' id='register-password' name='senha' required> </input>
    <label class='registration-description' for='confirmar-senha'> CONFIRMAR SENHA </label>
    <input type='password' class='registration-content' id='confirm-password' name='confirmar-senha' required> </input>
    </form>
    <p id='error'></p>
    <button id='register-button'>CRIAR CONTA</button>
    <p id='confirmation-message'> </p>
  <footer> <strong> © BOOMERANG </strong> </footer>
  </section>
  `;
  registerContainer.innerHTML = registerScreen;

  const icone = registerContainer.querySelector('#register-logo');
  icone.addEventListener('click', () => {
    window.history.back();
  });  

  const buttonRegister = registerContainer.querySelector('#register-button');
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault(); 
    const inputName = registerContainer.querySelector('#register-name').value.trim();
    const inputEmail = registerContainer.querySelector('#register-email').value.trim();
    const inputPassword = registerContainer.querySelector('#register-password').value.trim();
/*const inputConfirmPassword = registerContainer.querySelector('#confirm-password');
const confirmationMessage = registerContainer.querySelector('#confirmation-message');
// eslint-disable-next-line max-len
const validationRegister = validateRegister(inputName.value, inputEmail.value, inputPassword.value, inputConfirmPassword.value); */

    if (!inputName || !inputEmail || !inputPassword) {
const errorMessage = registerContainer.querySelector('#error');
errorMessage.innerHTML = 'Preencha os campos corretamente.';
    }
createUser(inputName, inputEmail, inputPassword).then((userCredential) => {
    const uid = userCredential.user.uid;
    userData(inputName, inputEmail, uid);
    confirmationMessage.innerHTML = 'CADASTRO REALIZADO COM SUCESSO! &#x2705 <br> Agora, faça o login para entrar!';
    alert('Cadastro realizado com sucesso!');
    window.location.hash = '#login';
  });
});
  return registerContainer;
};