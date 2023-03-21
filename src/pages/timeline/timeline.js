import { LogOut, auth } from '../../firebase/auth.js';

import createHeader from '../../components/header.js';

export default () => {
  const user = auth.currentUser;

  // if (user !== null) {
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  //   const uid = user.uid;
  //   console.log(email);
  // }

  const container = document.createElement('div');
  container.classList.add('container-timeline');

  const header = createHeader();
  header.classList.add('header-site');
  container.appendChild(header);

  const template = `
    <div class="form-wrapper">
       <div>        
        <p>Olá, ${user.displayName}</p>
        <p>${user.email}</p>
      </div>
      <div> <button type="button" id="logout-button" class="button logout-btn" href="#login">Sair</button></div>
    </div>
  `;

  container.innerHTML += template;

  const logoutButton = container.querySelector('#logout-button');

  logoutButton.addEventListener('click', () => {
    LogOut(user);
    window.location.replace('#login');
  });

  return container;
};
