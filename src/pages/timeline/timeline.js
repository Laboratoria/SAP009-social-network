import { logOut } from '../../firebase/auth.js';
import { accessPost } from '../../firebase/firestore.js';
import postsTm from './postsTm.js';
import posts from './posts.js';
import { redirect } from '../../redirect.js';
import { auth } from '../../firebase/app.js';
import logo from '../../images/logo.png';

export default async () => {
  const containerTimeline = document.createElement('div');

  const templateTimeline = `
  <header>
    <img src='${logo}' id="logo-timeline" alt="Logo da Anime-se">
    <span id="burger" class="material-symbols-outlined">menu</span>
    <nav id="menu">
        <a href="#about">Sobre as desenvolvedoras</a>
        <a href="#login" id="logout">Sair</a>
    </nav>
  </header>

  <main class="black-bg">
    <button id="open-modal">Recomende seu anime aqui, ${auth.currentUser.displayName}!</button>
    <section id="div-modal"></section>

    <section id='show-timeline'></section>
  </main>

    `;

  containerTimeline.innerHTML = templateTimeline;

  const showTimeline = containerTimeline.querySelector('#show-timeline');
  postsTm(await accessPost(), showTimeline);

  const logoutButton = containerTimeline.querySelector('#logout');
  logoutButton.addEventListener('click', () => {
    logOut();
    redirect('#login');
  });

  const menu = containerTimeline.querySelector('#menu');
  const burger = containerTimeline.querySelector('#burger');
  burger.addEventListener('click', () => {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  const btnModal = containerTimeline.querySelector('#open-modal');
  btnModal.addEventListener('click', () => {
    const divModal = containerTimeline.querySelector('#div-modal');
    divModal.appendChild(posts());
  });

  return containerTimeline;
};
