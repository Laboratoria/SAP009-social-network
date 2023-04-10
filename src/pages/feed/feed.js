import { DocumentSnapshot } from 'firebase/firestore';
import {
  sairPerfil,
  auth,
} from '../../servicesFirebase/firebaseAuth';

import { newPost, postsNaTela } from '../../servicesFirebase/fireStore';

export default () => {
  const container = document.createElement('div');
  const template = `
  <div class="home-feed">
  <header>
      <section class="container-feed">
          <div class="header">
                <a href="/#feed"><img class="logo-feed" src="./img/logo-sem-escrita.png"></a>

                <div class='feed-display'>
                <p class='username' id='username' >Olá, ${auth.currentUser.displayName}</p>
                </div>

                  <div class="menu-section">
                  <button class="menu-toggle">
                   <div class="one"></div>
                   <div class="two"></div>
                   <div class="three"></div>
                  </button>
                  <nav class="position-nav">
                      <div class="menu">
                          <ul class="ul-nav">
                              <li class="li-nav">
                                  <a class='options-perfil' href="#">Perfil</a>
                              </li>
                              <li class="li-nav">
                               <button id="btnSair" class='options-sair'>Sair</button>
                              </li>
                          </ul>
                      </div>
                  </nav>

              </div>
          </div>
        </section>
  </header>

  <div class="main">
    <section class="post">
        <section class="botoes">
            <button id="btn-modal" class="btn-publicar">Criar Post</button>
        </section>
    </section>
    <dialog class="dialog" id="bloco">
    <div class="modal">
      <button id="fechar" class="fechar">X</button>
      <textarea id="input-post" class="input-post"></textarea>
      <button id="btn-postar" class="btn-postar">Publicar</button>
    </div>
    </dialog>
    <section class="feed-posts">
      <div id="postagem"></div>
    </section>
  </div>

</div>
  `;

  function templatePost(doc) {
    const dados = doc.data()
    return `
    <section class="feed-posts">
        <div id="postagem">
            <div id="info-postagem">
                <p>${dados.userName}</p>
                <p>${dados.date}</p>
            </div>
            <textarea id='message-post' name='message-post' class='message-post' rows='3' cols='30' disabled>${dados.textArea}</textarea>
        </div>
    </section>
  </div >
   `;
}
  container.innerHTML = template;
  const btnModal = container.querySelector('#btn-modal');
  const btnMenu = container.querySelector('.menu-toggle');
  const modal = container.querySelector('#bloco');
  const fecharModal = container.querySelector('#fechar');
  const menu = container.querySelector('.menu-section');
  const btnPostar = container.querySelector('#btn-postar');
  const post = container.querySelector('#input-post');
  const postagem = container.querySelector('#postagem');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  const btnSair = container.querySelector('#btnSair');
  btnSair.addEventListener('click', () => sairPerfil()
    .then(() => {
      window.location.hash = '#login';
    }));

  btnModal.addEventListener('click', () => {
    modal.showModal();
  });
  fecharModal.addEventListener('click', () => {
    modal.close();
  });

  const user = auth.currentUser.displayName;
  if (user === '');

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const dataPostagem = today.toLocaleDateString();
  const idUser = auth.currentUser.uid;
  const userName = auth.currentUser.displayName;
  btnPostar.addEventListener('click', async () => {
    if (post.value !== '') {
      const novoPost = await newPost(dataPostagem, idUser, post.value, userName);
      postagem.innerHTML = templatePost(novoPost);
      modal.close();
    }
  });
  postagem.innerHTML = `${newPost} `;
  return container;
};
