import { logOut } from '../../firebase/auth.js';
import { accessPost } from '../../firebase/firestore.js';
import postsTm from './postsTm.js';
import posts from './posts.js';
import { redirect } from '../../redirect.js';
import { auth } from '../../firebase/app.js';

export const timeline = async () => {
  const container = document.createElement('div');

  container.innerHTML = `
  <header>
    <img src="./assets/logo.png" id="logo-timeline" alt="Logo da Anime-se">
    <span id="burger" class="material-symbols-outlined">menu</span>
    <nav id="menu">
      <ul>
        <li><a href="#login">Sobre as desenvolvedoras</a></li>
        <li><a href="#login">Indicações exclusivas</a></li>
        <li><a href="#login" id="logout">Sair</a></li>
      </ul>
    </nav>
  </header>
  
  <main class="black-bg">
    <button id="open-modal">Recomende seu anime aqui, ${auth.currentUser.displayName}!</button>
    <section id="div-modal"></section>
  
    <section id='show-timeline'></section>
  </main>

    `;

  const showTimeline = container.querySelector('#show-timeline');
  postsTm(await accessPost(), showTimeline);

  const logoutButton = container.querySelector('#logout');

  logoutButton.addEventListener('click', () => {
    logOut();
    redirect('#login');
  });

  const menu = container.querySelector('#menu');

  const burger = container.querySelector('#burger');
  burger.addEventListener('click', () => {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  const btnModal = container.querySelector('#open-modal');
  btnModal.addEventListener('click', () => {
    const divModal = container.querySelector('#div-modal');
    divModal.appendChild(posts());
  });

  return container;
};
