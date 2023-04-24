import { newPost, getPost } from '../firebase/firebasestore.js';
import { auth } from '../firebase/auth.js';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container-feed');

  const template = `
    <link rel="stylesheet" href="/pages/feed/feed.css">
    <aside class="menu hidden-when-mobile color-menu">
      <header class="header-menu">
        <img class="img-user" src="./image/logo_c&h.jpg" alt="logo Care&Health"/>
        <span>Fulano</span>
      </header>

      <nav>
        <button class="hidden-when-mobile">
          <span>
            <img src="./image/home.png" alt="icone de home" href="#" />
            <span>Home</span>
          </span>
        </button>

        <button class="hidden-when-mobile">
          <span>
            <img src="./image/publicar.png" src="ic_outline-add-circle-outline.png" alt="icone para publicar um post" href="#"/>
            <span>Publicar</span>
          </span>
        </button>

        <button class="hidden-when-mobile">
          <span>
            <img src="./image/sair.png" alt="icone para sair do app"/>
            <span>Sair</span>
          </span>
        </button>
      </nav>
    </aside>

  <!-- criando o menu hamburguer-->
    <button class="button-hamburguer">
      <img src="./image/menu-hamburguer.png" alt="ícone do menu"/>
    </button>

    <nav id="menu-mobile" class="menu-mobile">
      <button>
        <span class="img-close">
          <img src="./image/close.png" alt="ícone de X para fechar"/>
        </span>
      </button>

      <button>
        <span>
          <img src="./image/home.png" alt="icone de home" href="#" />
          <span class="text-mobile">Home</span>
        </span>
      </button>

      <button>
        <span>
          <img src="./image/publicar.png" src="ic_outline-add-circle-outline.png" alt="icone para publicar um post" href="#"/>            
          <span class="text-mobile">Publicar</span>
        </span>
      </button>

      <button>
        <span>
          <img src="./image/sair.png" alt="icone para sair do app"/>
          <span class="text-mobile">Sair</span>
        </span>
      </button>
    </nav>


     
  <main class="main">
      <section class="timeline">
        <section>
          <img class="logo-feed" src="./image/logo-titulo.png">
        </section>

        <form class="form-pots">
          <div class="post">
            <div class="post-text">
              <p class="username" id="username"></p>
              <textarea class="textarea" placeholder="Qual a sua dica/dúvida sobre pele ou cabelo?"></textarea>
            </div>
          
            <div class="post-button">
              <button type="button" id="button-publish" class="button-publish">Publicar</button>
            </div>
          </div>
        </form>
        <section id="post-container" class="post-container"></section>
      </section>
  </main>
  `;

  container.innerHTML = template;

  function toggleMenu() {
    const menuMobile = document.getElementById('menu-mobile');

    if (menuMobile.className === 'menu-mobile-active') {
      menuMobile.className = 'menu-mobile';
      menuMobile.setAttribute('src', 'close.png');
      document.getElementsByClassName('button-hamburguer').display = 'none';
      document.getElementsByClassName('img-close').display = 'block';
    } else {
      menuMobile.className = 'menu-mobile-active';
      menuMobile.setAttribute('src', 'menu-hamburguer.png');
      document.getElementsByClassName('button-hamburguer').display = 'block';
      document.getElementsByClassName('img-close').display = 'none';
    }
  }

  const menuOpen = container.querySelector('.button-hamburguer');
  menuOpen.addEventListener('click', toggleMenu);

  const menuClose = container.querySelector('.img-close');
  menuClose.addEventListener('click', toggleMenu);

  // limpar campo de post depois de postado

  function cleanPost() {
    document.querySelector('.textarea').value = '';
  }

  // printar os posts na tela para o usuário

  const printPost = async () => {
    const arrayPost = await getPost();
    const templatePublish = arrayPost
      .map(
        (post) => `
    <section class="posts-users">
      <div class="text-and-likes">
        <div class="name-and-date">
          <label class="name-post-user">${post.username}</label>
        </div>
        <div>
          <p class="text-post-user">${post.text}</p>
          <label class="date-and-hour">${post.date}</label>
          <label class="date-and-hour">às ${post.hour}</label>
        </div> 
        <div class="like">
          <button class="like-post-user" id="like-post">
            <img class="like-heart" src="./image/like.png" alt="ícone de like com coração">
            <label id="likes-quantities">${post.like}</label>
        </button>
      </div> 
      <div class="group-buttons">
        <div class="delete">
          <button class="btn-delete" id="btn-delete">
            <img src="./image/lixeira.png" alt="icone para deletar o post">
          </button>
        </div>
        <div class="edit">
          <button class="btn-edit" id="btn-edit">
            <img src="./image/editar.png" alt="icone para deletar o post">
          </button>
        </div>
      </div>        
    </section>
    `).join('');
    container.querySelector('.post-container').innerHTML = templatePublish;
  };
  printPost();

  // pegar o post e armazenar no firabase

  const text = container.querySelector(".textarea");
  const buttonPublish = container.querySelector(".button-publish");
  buttonPublish.addEventListener("click", () => {
    if (text.value !== "") {
      const today = new Date();
      //const dataPostagem = today.toLocaleDateString();
      const username = auth.currentUser.displayName;
      const idUser = auth.currentUser.uid;
      newPost(text.value, today, username, idUser).then(() => {
        printPost();
        cleanPost();
      });
    } else {
      alert("Por favor, escreva algo para publicar!");
    }
  });

  return container;
};
