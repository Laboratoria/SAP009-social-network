export default () => {
  const container = document.createElement('div');
  const template = `
  <header class="header">
      <div class="div-img-logo">
      <img class="logo-feed" src='./img/lofeedsemfundo.png' alt='logo HelParents' class='img-logo'>
      </div>
      <button class="btn-sair">
        <img class="img-sair" src='./img/logout.png' alt='logo HelParents' class='img-logo'>
      </button>
  </header>
  <main>
    <div class="container-img-feed"> 
     <section class="posiçao-imagem-feed">
       <picture class="div-img">
          <img class= "ilustration-feed"src="./img/op15.png" alt="notebook">
       </picture>
       </section>
      <section class="posição-posts-feed">
       <section class="feed-posts">
          <div class="postando">
              <div class="position-user-name">
              <img class="img-user-name" src="./img/profile-user.png" alt="user-name">
              <p class="user-name">username</p>
              </div>
              <textarea name="" id="txt-area" cols="70" rows="5" placeholder= "Escreva seu post"></textarea>
              <div class="posição-botão-postar">
                 <button class="btn-postar">
                  <img class='postar-img' src='./img/checked.png' alt='logo-google'>
                 </button>
              </div>
          </div>
          <div class="postado">
              <ul>
                  <li>
                  <div> 
                  <div class="position-user-name">
                  <img class="img-user-name" src="./img/profile-user.png" alt="user-name">
                  <p class="user-name">username</p>
                  </div>
                  <textarea name="" id="txt-area-postado" cols="70" rows="5"></textarea>
                  <div class="position-btn-postar">
                    <button class="btn-postar">
                      <img class='editar-img' src='./img/editar-informacao.png' alt='logo-google'>
                    </button>
                    <button class="btn-postar">
                      <img class='excluir-img' src='./img/botao-apagar.png' alt='logo-google'>
                    </button>
                    <button class="btn-postar">
                     <img class='curtir-img' src='./img/ame.png' alt='logo-google'>
                   </button>
                 </div>
                  </div>
                  </li>
              </ul>
          </div>
      </section>
     </section> 
      </div>
  </main>
    `;

  container.innerHTML = template;
  const btnSair = container.querySelector('.btn-sair');
  btnSair.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return container;
};
