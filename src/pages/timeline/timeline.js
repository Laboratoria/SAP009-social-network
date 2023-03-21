import { logOut } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
    <header>
      <h1>Anime-se</h1>
      <span id="burger" class="material-symbols-outlined">menu</span>
      <nav id="menu">
        <ul>
          <li><a href="#login">Sobre as desenvolvedoras</a></li>
          <li><a href="#login">Indicações exclusivas</a></li>
          <li><a href="#login" id="logout">Sair</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <button id="open-modal">Recomende seu anime aqui!</button>
      <div id="fade" class="hide"></div>
      <div id="modal" class="hide">
      <div class="modal-header">
        <button id="close-modal">X</button>
      </div>

      <div class="modal-body">
        <form class ="modal-form">
          <div class="single-input">
            <input required type="text" id="anime" class="input">
            <label for="anime">Nome do anime</label>
          </div>

          <div class="single-input">
          <input required type="text" id="episodes" class="input">
          <label for="episodes">Quantidade de episódios</label>
        </div>
        </form>

        <textarea id="post-area" placeholder="Fale sobre o anime aqui"></textarea>
        <button id="post-button">Publicar</button>
        </div>
    </main>
  `;

  container.innerHTML = template;

  const logoutButton = container.querySelector('#logout');

  logoutButton.addEventListener('click', () => {
    logOut();
    window.location.replace('#login');
    console.log('saiu');
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

  return container;
};
