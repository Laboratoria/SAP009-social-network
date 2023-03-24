/* eslint-disable no-use-before-define */
import {} from 'firebase/firestore';
import { LogOut, auth } from '../../firebase/auth.js';
import createHeader from '../../components/header.js';
import {
  createNewPost,
  getLoggedUserAllPosts,
} from '../../firestore/DBFunctions';

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
  // createNewPost('tegravou omdele');

  const container = document.createElement('div');
  container.classList.add('container-timeline');
  const header = createHeader();
  header.classList.add('header-site');
  container.appendChild(header);


  let loggedUserAllPosts = [];

  function showAllPosts() {
    if (loggedUserAllPosts) {
      const mappedPosts = loggedUserAllPosts.map((post) => post);
      const postsList = document.createElement('div');
      container.appendChild(postsList);
      mappedPosts.forEach((post) => {
        const postElement = document.createElement('li');
        postElement.innerText = post.title;
        postsList.appendChild(postElement);
      });
    }
  }

  getLoggedUserAllPosts()
    .then((posts) => {
      loggedUserAllPosts = posts;
      showAllPosts(loggedUserAllPosts);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('Fim da solicitação de posts.');
    });

  const template = `
    <div class="form-wrapper-timeline">
       <div>        
          <p class="greeting">Olá,</p> 
          <div class="div-greeting-button">
            <p class="greeting-name">${user.displayName}</p>
            <img src="./assets/bt-new-post.png" id="btn-new-post" class="" alt="logo da ConectAda">
          </div>
        <div id="post-list">
        </div>
      </div>
    

    <div class="div-logout-btn"> <button type="button" id="logout-button" class="button logout-btn" href="#login">Sair</button></div>
  `;

  container.innerHTML += template;

  const logoutButton = container.querySelector('#logout-button');

  logoutButton.addEventListener('click', () => {
    LogOut(user);
    window.location.replace('#login');
  });
  const newPostButton = container.querySelector('#btn-new-post');
  newPostButton.addEventListener('click', showDescription);

  function showDescription() {
    const modalContainer = document.getElementById('post-list');

    modalContainer.innerHTML = `
    <div class="modal">
    <p>oi</p>
    </div>`;

    modalContainer.classList.add('show');

    // const close = document.getElementById('close');
    // close.addEventListener('click', () => {
    //   modalContainer.classList.remove('show');
    // });

  }
    return container;
  };

