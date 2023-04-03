export default () => {
  const container = document.createElement('div');
  const template = `
  <body>
  <header class="header">
      <h1>HelParents</h1>
      <button class="btn-sair">Sair</button>
  </header>
  <main>
      <section>
          <picture>
              <source media="(min-width:650px)" srcset="notebook.png">
              <source media="(min-width:465px)" srcset="notebook.png">
              <img src="../imagens/notebook.png" alt="notebook" style="width:auto;">
            </picture>
      </section>
      <section class="feed-posts">
          <div class="postando">
              <textarea name="" id="txt-area" cols="70" rows="5">Escreva um post</textarea>
              <div class="posição-botão-postar">
                 <button id="btn-postar">postar</button>
              </div>
          </div>
          <div class="postado">
              <ul>
                  <li>

                  </li>
              </ul>
          </div>
      </section>

  </main>
</body>
    
  
    `;

  container.innerHTML = template;
  const btnSair = container.querySelector('.btn-sair');
  btnSair.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return container;
};
