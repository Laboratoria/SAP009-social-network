import { LogOut } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
    <p>Timeline</p>
    <button type="button" id="logout-button" href="#login">Logout</button>
  `;

  container.innerHTML = template;

  const logoutButton = container.querySelector('#logout-button');
 logoutButton.addEventListener('click', () => {
    LogOut();
    // Adicione aqui o código que deve ser executado quando o botão de login é clicado

    window.location.replace('#login');
  });
  return container; 
};
