import { logOut } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
    <header>
      <h1>Anime-se</h1>
      <span id="burger" class="material-symbols-outlined">menu</span>
      <nav id="menu">
        <ul>
          <li><a href="#login">Sobre as criadoras</a></li>
          <li><a href="#login">Indicações exclusivas</a></li>
          <li><a href="#login" id="logout">Sair</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <article>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta quaerat quo rerum. Dolore eius numquam temporibus eaque in delectus magnam, recusandae sint voluptas. Deserunt suscipit fugit aut ratione in id.</p>
      </article>
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

  return container;
};
