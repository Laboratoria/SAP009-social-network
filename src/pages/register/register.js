/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { createUserWithEmail } from '../../firebase/auth.js';
import { errorsFirebase, validateRegister } from '../../validations.js';
import { redirect } from '../../redirect.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <div class="form-wrapper">
  <img src="./assets/logo.png" id="logo" alt="Logo da Anime-se">

  <form>
    <div class="inputs-div">
      <input type="text" class="inputs-register" id="user-name" placeholder="Nome completo">
      <input type="email" class="inputs-register" id="register-email" placeholder="nome@email.com">
      <input type="email" class="inputs-register" id="confirm-email" placeholder="Confirme seu email">
      <input type="password" class="inputs-register" id="register-password" placeholder="senha">
      <input type="password" class="inputs-register" id="confirm-password" placeholder="Confirme sua senha"> 
    </div>

    <div>
      <button type="button" id="register-btn" href="#timeline">Registre-se</button>
    </div>

    <div>
      <button type="button" id="login-btn">Já tem uma conta? <a id="login-link" href="#login">Login</a></button>
    </div>

    <p class="msg-error"></p>

  </form>
</div>
`;

  container.innerHTML = template;

  const registerButton = container.querySelector('#register-btn');
  const registerName = container.querySelector('#user-name');
  const registerEmail = container.querySelector('#register-email');
  const repeatEmail = container.querySelector('#confirm-email');
  const registerPassword = container.querySelector('#register-password');
  const repeatPassword = container.querySelector('#confirm-password');
  const errorMessage = container.querySelector('.msg-error');

  registerButton.addEventListener('click', () => {
    const name = registerName.value;
    const email = registerEmail.value;
    const emailRepeat = repeatEmail.value;
    const password = registerPassword.value;
    const passwordRepeat = repeatPassword.value;

    const register = validateRegister(name, email, emailRepeat, password, passwordRepeat);
    if (register === '') {
      createUserWithEmail(email, password)
        .then(() => {
          console.log('Usuário cadastrado - register');
          redirect('#timeline');
        })
        .catch((error) => {
          console.log('Erro de cadastro');
          const errorFirebase = errorsFirebase(error.code);
          errorMessage.innerHTML = errorFirebase;
        });
    } else {
      errorMessage.innerHTML = register;
    }
  });

  return container;
};
