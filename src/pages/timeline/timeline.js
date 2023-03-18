import { LogOut } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add("container");
  const template = `
  <div class="form-wrapper">
  <div class= "div-logo">
  <img src="./assets/conectadas-logo.png" id="ada-logo" class="logo-image" alt="logo da ConectAda">
    </div>
    <div>
    <h1>Timeline</h1>
    <button type="button" id="logout-button" class="button logout-btn" href="#login">Sair</button>
    </div>
    </div>
  `;

  container.innerHTML = template;

  const logoutButton = container.querySelector('#logout-button');
  logoutButton.addEventListener('click', () => {
    LogOut();
    window.location.replace('#login');
  });
  return container;
};
