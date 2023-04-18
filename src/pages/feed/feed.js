import { deletarPost } from "../../firebase/firestore";

export default () => {
  const container = document.createElement('div');
  const template = `
  <header class="header">
      <div class="div-img-logo">
      <img src='./img/logohelp12.png' alt='logo HelParents' class='img-logo'>
      </div>
      <button class="btn-sair">Sair</button>
  </header>
  <main>
    <div class="container-img-feed"> 
       <picture class="div-img">
          <img src="./img/mobile.png" alt="notebook" style="width:auto;">
       </picture>
      <section class="feed-posts">
          <div class="postando">
              <textarea name="" id="txt-area" cols="70" rows="5" placeholder= "Escreva seu post"></textarea>
              <div class="posição-botão-postar">
                 <button class="btn-postar">postar</button>
                 <button class="btn-deletar">deletar</button>
              </div>
          </div>
          <div class="postado">
              <ul>
                  <li>
                  <div> 
                  <textarea name="" id="txt-area-postado" cols="70" rows="5"></textarea>
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

  const postFeed = container.querySelector('.feed');

  const btnDeletar = container.querySelector('.btn-deletar');
  btnDeletar.addEventListener('click', (e) => {
    e.preventDefault();
    if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
      deletarPost("9qIJy5MkDioS009Uk6yd")
        //.then(() => {
         // postFeed.remove();
        //});
    }
  });


  return container;
};
