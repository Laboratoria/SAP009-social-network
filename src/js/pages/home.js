export default () => {
  const homeContainer = document.createElement('div');

  const homeTemplate = `
<section class="home-main">
    <img id="logo-complete" src="img/logo-s2s-transparent.png">
    <div class="home-initial-text">  
        <h1>The best social media for learning English!</h1>
        <br>
        <h2>A melhor rede social para aprender Inglês!</h2>
        <br>
    </div>
    <div class="icons-home">
        <img src="./img/location-dot-solid.svg" alt="Location dot icon" class"icons-blue">
        <img src="./img/logo-icon-no-background.png" alt="Logo s2s three people icon" class"icons-orange">
        <img src="./img/pen-to-square-regular.svg" alt="Pen to square icon" class"icons-blue">
        <img src="./img/heart-solid.svg" alt="Love icon"  class"icons-orange">
    </div>
    <div class="text-home">
        <p>Estudantes de todo o país se encontram aqui.</p>
        <br>
        <p>Participe de comunidades sobre músicas, filmes, séries, memes,
        gramática e muito mais.</p>
        <br>
        <p>Crie postagens e compartilhe ideias e pensamentos.</p>
        <br>
        <p>Curta conteúdos de outras pessoas e faça amizades.</p>
        <br>
    </div>
    <button id="sign-in-home">SIGN IN</button>
</section>
  `;
    /* inserir container header */

  homeContainer.innerHTML = homeTemplate;

  /* inserir container footer */

  return homeContainer;
};
