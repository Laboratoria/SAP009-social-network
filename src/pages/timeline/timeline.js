import { } from 'firebase/firestore';
import { LogOut, auth } from '../../firebase/auth.js';
import createHeader from '../../components/header.js';
import { createNewPost, getLoggedUserAllPosts } from '../../firestore/DBFunctions';

export default () => {
  const user = auth.currentUser;
  // console.log(user);
  // if (user !== null) {
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  //   const uid = user.uid;
  //   console.log(email);
  // }

  // TESTANDO FUNCAO MANUALMENTE
  createNewPost('tegravou omdele');

  // FUNCIONA
  getLoggedUserAllPosts();

  const container = document.createElement('div');
  container.classList.add('container-timeline');

  const header = createHeader();
  header.classList.add('header-site');
  container.appendChild(header);

  const template = `
    <div class="form-wrapper-timeline">
       <div>        
          <p class="greeting">Olá,</p> 
          <div class="div-greeting-button">
            <p class="greeting-name">${user.displayName}</p>
            <img src="./assets/bt-new-post.png" id="ada-logo" class="" alt="logo da ConectAda">
          </div>
      </div>
      <div class="post">
      lalal
    </div>

    <div class="div-logout-btn"> <button type="button" id="logout-button" class="button logout-btn" href="#login">Sair</button></div>
  `;

  container.innerHTML += template;
  const logoutButton = container.querySelector('#logout-button');

  logoutButton.addEventListener('click', () => {
    LogOut(user);
    window.location.replace('#login');
  });

  return container;
};
