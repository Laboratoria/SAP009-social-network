import { createUserWithEmail } from '../../firebase/auth.js';
import { showErrorMessage } from '../errorHandling.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container');
  const template = `
  <div class='form-wrapper'>  
    <div class= 'div-logo'>
      <img src='./assets/conectadas-logo.png' id='ada-logo' class='logo-image' alt='logo da ConectAda'>
    </div>
    <h1>Crie sua conta</h1>
    <div>
      <label id='error-label' class='label-error'></label>
    </div>  
    <form>
      <div class='inputs-div'>
        <input type='text' name='name' class='input' id='register-name' placeholder='Digite seu nome'> 
        <input type='email' name='email' class='input' id='register-email' placeholder='Digite seu e-mail'>
        <input type='password' name='password' class='input' id='register-password' placeholder='Digite sua senha'>
      </div>
      <div>
        <button type='button' id='register-btn' class='button' href='#timeline'>Registre-se</button>
      </div>
      <div class='register-div'>
        <p>Já tem uma conta?</p>
        <a id='register-link' href='#login'>Entrar</a>        
        </div> 
      <div>
        <label id='error-label' class='label-error'></label>
      </div>
    </form>
</div>
`;

  container.innerHTML = template;

  const registerButton = container.querySelector('#register-btn');
  const registerEmail = container.querySelector('#register-email');
  const registerPassword = container.querySelector('#register-password');
  const registerName = container.querySelector('#register-name');
  const errorLabel = container.querySelector('#error-label');

  registerButton.addEventListener('click', () => {
    const email = registerEmail.value;
    const password = registerPassword.value;
    const name = registerName.value;

    if (email !== '' && password !== '' && name !== '') {
      createUserWithEmail(email, password, name)
        .then((isRegistered) => {
          console.log(isRegistered);
          window.location.replace('#login');
        })
        .catch((error) => {
          showErrorMessage(error);
        })
        .finally(() => {
          console.log('Processo de autenticação finalizado em login.');
        });
    } else {
      errorLabel.innerHTML = 'Preencha todos os campos';
    }
  });

  return container;
};
