import { logOut } from '../../firebase/auth.js';
import { accessPost } from '../../firebase/firestore.js';
import postsTm from './postsTm.js';
import posts from './posts.js';
import { redirect } from '../../redirect.js';
import { auth } from '../../firebase/app.js';
import logo from '../../images/logo.png';

export default async () => {
  const containerTimeline = document.createElement('div');

  // containerTimeline.innerHTML = `
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

/*
export default () => {
  const userId = getUserId();
  const container = document.createElement('div');
  container.classList.add('container-timeline');
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
    <button id="open-modal">Recomende seu anime aqui, ${auth.currentUser.displayName}!</button>
    <section class="div-modal"></section>
    <section id='show-timeline'></section>
  </main>`;

  container.innerHTML = template;

  const showPosts = async () => {
    const groupArr = await accessPost();
    const postsTemplate = groupArr.map((post) => {
      let editBtnTemplate = '';

      if (userId === post.author) {

        `;
      }

      const postTemplate = `
        <div class='post'>
          <section class='box-post-timeline' data-section-post-id=${post.id}>
          <div class='box-complete-post'>
          <div class='box-info-post'>
            <p id='user'>${post.name}<p/>
            <p id='anime-name'>${post.anime}</p>
            <p id='anime-episodes'>${post.episodes} episódios</p>
          </div>
              <details>
        <summary class='view-description'>Ver mais</summary>
           <div class='box-description'>
              <p id='post-description'>${post.description}</p>
           </div>
      </details>
      <br>
              <div class='btn-options'>
                ${editBtnTemplate}
              </div>
            </div>
          </section>
          <section class="div-modal"></section>
        </div>
        </br>

      `;

      return postTemplate;
    }).join('');
    container.querySelector('#show-timeline').innerHTML += postsTemplate;

    const btnEdit = container.querySelector('#btn-edit');
    btnEdit.addEventListener('click', () => {
      console.log('clicou');
      const divModal = container.querySelector('.div-modal');
      divModal.appendChild(editPost(editPosts()));
    });

    const btnDel = container.querySelector('#btn-del');
    btnDel.addEventListener('click', (e) => {
      if (window.confirm('Tem certeza que deseja excluir a publicação?')) {
        const postId = e.currentTarget.dataset.delete;
        deletePost(postId)
          .then(() => {
            redirect('#timeline');
          });
      }
    });

  };

  const menu = container.querySelector('#menu');
  const burger = container.querySelector('#burger');
  burger.addEventListener('click', () => {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  const logoutButton = container.querySelector('#logout');
  logoutButton.addEventListener('click', () => {
    logOut();
    redirect('#login');
  });

  const btnModal = container.querySelector('#open-modal');
  btnModal.addEventListener('click', () => {
    const divModal = container.querySelector('.div-modal');
    divModal.appendChild(posts());
  });

  showPosts();

  return container;
};
*/
