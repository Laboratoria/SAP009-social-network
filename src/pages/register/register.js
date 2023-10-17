/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { createUserWithEmail } from '../../firebase/auth.js';
import { errorsFirebase, validateRegister } from '../../validations.js';
import { redirect } from '../../redirect.js';
import logo from '../../images/logo.png';

export default () => {
  const containerRegister = document.createElement('div');

  const templateRegister = `
  <div class="form-wrapper">
  <img src='${logo}' id="logo" alt="Logo da Anime-se">

  <form>
    <div class="inputs-div">
      <input type="text" class="inputs-register" id="user-name" placeholder="Nome completo">
      <input type="email" class="inputs-register" id="register-email" placeholder="nome@email.com">
      <input type="password" class="inputs-register" id="register-password" placeholder="senha">
      </div>

    <div>
      <button type="button" id="register-btn" href="#timeline">Registre-se</button>
    </div>

    <p class="msg-error"></p>

    <div>
      <button type="button" id="login-btn">Já tem uma conta? <a id="login-link" href="#login">Login</a></button>
    </div>

  </form>
</div>
`;

  containerRegister.innerHTML = templateRegister;

  const registerButton = containerRegister.querySelector('#register-btn');
  const registerName = containerRegister.querySelector('#user-name');
  const registerEmail = containerRegister.querySelector('#register-email');
  const registerPassword = containerRegister.querySelector('#register-password');
  const errorMessage = containerRegister.querySelector('.msg-error');

  registerButton.addEventListener('click', async () => {
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;

    const registerAccount = validateRegister(name, email, password);
    if (registerAccount === '') {
      try {
        await createUserWithEmail(name, email, password);
        redirect('#timeline');
        window.location.reload();
      } catch (error) {
        const errorFirebase = errorsFirebase(error.code);
        errorMessage.innerHTML = errorFirebase;
      }
    } else {
      errorMessage.innerHTML = registerAccount;
    }
  });

  return containerRegister;
};
