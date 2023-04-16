import {
  sairPerfil,
  auth,
} from '../../servicesFirebase/firebaseAuth';

import {
  likePost,
  newPost,
  postsNaTela,
  deletarPost,
  editPost,
} from '../../servicesFirebase/fireStore';

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
      <div id="postagem">${postsNaTela()}</div>
    </section>
  </div>

</div>
  `;

  function templatePost(doc) {
    const dados = doc.data();
    return `
    <section class="feed-posts">
        <div class="container-post" data-post-id="${doc.id}">
            <div class="info-postagem">
                <p>${dados.userName}</p>
                <p>${dados.date}</p>
            </div>
              <textarea class="bloco-texto" data-texto-id="${doc.id}" style="resive=none" disabled>${dados.textArea}</textarea>
            <section class="icones">
            <div class="curtida">
            <button class="btn-like"><img data-like-id="${doc.id}" class="img-curtida" src=" 
            ${dados.likes.includes(auth.currentUser.uid) ? '../img/panela-preenchida.png' : '../img/panela.png'}"></button>
            </div>
            <button class="btn-salvar" hidden data-salvar-id="${doc.id}">Salvar</button>
            ${dados.idUser === auth.currentUser.uid ? `<div class="btn-usuarios">
              <button class="btn-editar"><img data-editar-id="${doc.id}" class="img-editar" src="../img/icone-editar.png" ></button>
              <button class="btn-excluir"><img data-excluir-id="${doc.id}" class="img-excluir" src="../img/icone-excluir.png"></button>
            </div>` : ''} 
        </div>
    </section>
  </div >
   `;
  }

  // ELEMENTOS DO TEMPLATE PRINCIPAL //
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

  // ELEMENTOS DO TEMPLATE POST //
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const dataPostagem = today.toLocaleDateString();
  const idUser = auth.currentUser.uid;
  const userName = auth.currentUser.displayName;
  btnPostar.addEventListener('click', async () => {
    if (post.value !== '') {
      const novoPost = await newPost(dataPostagem, idUser, post.value, userName);
      Promise.resolve(teste()).then((value) => {
        postagem.innerHTML = `${value} `;
      });
      modal.close();
    }
  });

  // FUNÇÃO PARA JUNTAR TODOS OS POSTS NA TELA //
  async function teste() {
    const arrayTemplates = [];
    const arrayPost = await postsNaTela();
    arrayPost.forEach((element) => {
      arrayTemplates.push(templatePost(element));
    });
    // console.log(arrayTemplates); //
    return arrayTemplates.join('');
  }

  const resultado = Promise.resolve(teste()).then((value) => {
    console.log(value);
    postagem.innerHTML = `${value} `;
  });

  // RASTREAR EVENTOS DE CLICK e adicionar as funções de cada evento //
  postagem.addEventListener('click', async (event) => {
    const element = event.target; // elemento que é clicado
    const imgLike = container.querySelector(`[data-like-id='${element.dataset.likeId}']`);
    const btnSalvar = container.querySelector(`[data-salvar-id='${element.dataset.salvarId}']`);
    const areaTexto = container.querySelector(`[data-texto-id='${element.dataset.textoId}']`);
    if (element.dataset.likeId) {
      const likes = await likePost(element.dataset.likeId, idUser);
      if (likes.liked === true) {
        imgLike.setAttribute('src', '../img/panela-preenchida.png'); // trocar imagem
      } else {
        imgLike.setAttribute('src', '../img/panela.png'); // trocar imagem
      }
    } else if (element.dataset.editarId) {
      btnSalvar.removeAttribute('hidden');
      areaTexto.removeAttribute('disabled');
      editPost(doc.id, post);
    } else if (element.dataset.excluirId) {
      if (window.confirm('Tem certeza que gostaria de deletar essa postagem?')) {
        deletarPost(element.dataset.excluirId)
          .then(() => {
            document.location.reload(true);
          }).catch(() => {
            alert('Não foi possível deletar sua postagem. Tente novamente.');
          });
      }
      console.log(event.target.getAttribute('data-excluir-id'));
    }
  });

  /* postagem.innerHTML = `${resultado} `; */

  return container;
};
