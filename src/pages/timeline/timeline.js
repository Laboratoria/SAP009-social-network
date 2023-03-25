import { logOut } from '../../firebase/auth.js';
import { accessPost } from '../../firebase/firestore.js';
import posts from './posts.js';
import { redirect } from '../../redirect.js';

export default () => {
  const container = document.createElement('div');
  // container.classList.add('container-timeline');

  const template = `
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
    <button id="open-modal">Recomende seu anime aqui!</button>
    <section id="div-modal"></section>
  
    <section id='show-timeline'></section>
  </main>

    `;

  container.innerHTML = template;

  const showPosts = async () => {
    const showing = await accessPost();
    const postsTemplate = showing.map((post) => {
      const postTemplate = `
      <div class='post'>
        <section class='box-post-timeline'>
          <div class='box-complete-post'>
            <div class='box-info-post'>
              <p id='anime-name'>${post.anime}</p>
              <p id='anime-episodes'>${post.episodes}</p>
            </div>
            <div class='box-text-post'>
              <p id='post-description'>${post.description}</p>
            </div>
          </div>
        </section>
      </div>
      </br>
    `;
      /*
    const showPosts = async () => {
      const showing = await accessPost();
      const postsTemplate = showing.map((post) => {
        const postTemplate = `
        <div class='post'>
          <section class='box-post-timeline' data-section-post-id=${post.id}>
            <div class='box-complete-post'>
              <div class='box-info-post'>
                <p id='user-name'>${post.name}</p>
                <p id='anime-name'>${post.anime}</p>
                <p id='anime-episodes'>${post.episodes}</p>
                <p id='post-date'>${post.date}</p>
              </div>
              <div class='box-text-post'>
                <p id='post-description'>${post.description}</p>
              </div>
            </div>
          </section>
        </div>
        </br>
      `;
*/
      return postTemplate;
    }).join('');

    container.querySelector('#show-timeline').innerHTML += postsTemplate;
  };

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

  /*
  const openModalButton = container.querySelector('#open-modal');
  const closeModalButton = container.querySelector('#close-modal');
  const modal = container.querySelector('#modal');
  const fade = container.querySelector('#fade');

  const toggleModal = () => {
    [modal, fade].forEach((el) => el.classList.toggle('hide'));
  };

  [openModalButton, closeModalButton, fade].forEach((el) => {
    el.addEventListener('click', () => toggleModal());
  });

  const postButton = container.querySelector('#post-button');
  const animePost = container.querySelector('#anime');
  const episodesPost = container.querySelector('#episodes');
  const descriptionPost = container.querySelector('#post-area');

  function publishPost() {
    const posts = {
      anime: animePost.value,
      episodes: episodesPost.value,
      description: descriptionPost.value,
    };
    console.log(posts);
  }

  postButton.addEventListener('click', () => {
    console.log('clicou');
    const anime = animePost.value;
    const episodes = episodesPost.value;
    const description = descriptionPost.value;

    createPost(anime, episodes, description);
    window.location.replace('#timeline');
  });
*/
  showPosts();

  return container;
};
