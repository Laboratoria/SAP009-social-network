import headerInitial from '../components/headers/header-initial.js';
import footer from '../components/footer.js';

export default () => {
  const homeContainer = document.createElement('section');
  homeContainer.classList.add('home-section');

  const homeTemplate = `
<div class="home-main">
  <img id="logo-complete" src="img/logo-s2s-transparent.png">
  <div class="home-initial-text">  
    <h1>The best social media for learning English!</h1>
    <br>
    <h2>A melhor rede social para aprender Inglês!</h2>
    <br>
  </div>
  <div class="main-content-home">
    <div class="icons-text-home">
      <img src="./img/location-dot-solid.svg" alt="Location dot icon" class="icons-home">
      <p class="text-home">Estudantes de todo o país se encontram aqui.</p>
    </div>
    <div class="icons-text-home">
      <img src="./img/logo-icon-no-background.png" alt="Logo s2s three people icon" class="icons-home">
      <p class="text-home">Participe de comunidades sobre músicas, filmes, séries, memes, gramática e muito mais.</p>
    </div>
    <div class="icons-text-home">
      <img src="./img/pen-to-square-regular.svg" alt="Pen to square icon" class="icons-home">
      <p class="text-home">Crie postagens e compartilhe ideias e pensamentos.</p>
    </div>
    <div class="icons-text-home">
      <img src="./img/heart-solid.svg" alt="Love icon"  class="icons-home">
      <p class="text-home">Curta conteúdos de outras pessoas e faça amizades.</p>
    </div>
  </div>
  <div id="button-home">  
    <button id="sign-in-home-button">SIGN IN</button>
  </div>
</div>
  `;

  homeContainer.innerHTML = homeTemplate;
  homeContainer.appendChild(headerInitial());
  homeContainer.appendChild(footer());

  return homeContainer;
};
