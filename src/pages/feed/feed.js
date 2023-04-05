export default () => {
  const container = document.createElement('div');
  const template = `
  <header class="header">
      <h1 class= "logo-geral">HelParents</h1>
      <button class="btn-sair">Sair</button>
  </header>
  <main>
    <div class="container-img-feed"> 
       <picture class="div-img">
          <img src="./img/mobile.png" alt="notebook" style="width:auto;">
       </picture>
      <section class="feed-posts">
          <div class="postando">
              <textarea name="" id="txt-area" cols="70" rows="5">Escreva um post</textarea>
              <div class="posição-botão-postar">
                 <button class="btn-postar">postar</button>
              </div>
          </div>
          <div class="postado">
              <ul>
                  <li>
                  <div> 
                  <textarea name="" id="txt-area-postado" cols="70" rows="5">Post escrito</textarea>
                  </div>
                  </li>
              </ul>
          </div>
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
