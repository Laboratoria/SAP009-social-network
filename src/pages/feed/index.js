// import { getAuth } from 'firebase/auth';
import {
  newPost, getPost, deletePost, likePost, editPost, unlikePost,
} from '../firebase/firebasestore.js';
import { auth, logout } from '../firebase/auth.js';
import imgLogoSite from '../../image/logo_c&h.jpg';
import imgLogoTitulo from '../../image/logo-titulo.png';
import imgHome from '../../image/home.png';
import imgClose from '../../image/close.png';
import imgPublicar from '../../image/publicar.png';
import imgSair from '../../image/sair.png';
import imgHamburguer from '../../image/menu-hamburguer.png';
import imgLike from '../../image/like.png';
import imgLiked from '../../image/liked-red.png';
import imgLixeira from '../../image/lixeira.png'
import imgEditar from '../../image/editar.png';

export default () => {
  const container = document.createElement('div');
  container.classList.add('container-feed');

  const template = `
    <link rel="stylesheet" href="/pages/feed/feed.css">
    <aside class="menu hidden-when-mobile color-menu">
      <header class="header-menu">
        <img class="img-user" src="${imgLogoSite}" alt="logo Care&Health"/>
        <span>${auth.currentUser.username || auth.currentUser.email}</span>
      </header>

      <nav>
        <button class="hidden-when-mobile">
          <span>
            <img src="${imgHome}" alt="icone de home" href="#" />
            <span>Home</span>
          </span>
        </button>

        <button class="hidden-when-mobile">
          <span>
            <img src="${imgPublicar}" alt="icone para publicar um post" href="#"/>
            <span>Publicar</span>
          </span>
        </button>

        <button class="hidden-when-mobile">
          <span class="logout">
            <img src="${imgSair}" alt="icone para sair do app"/>
            <span>Sair</span>
          </span>
        </button>
      </nav>
    </aside>

  <!-- criando o menu hamburguer-->
    <button class="button-hamburguer">
      <img src="${imgHamburguer}" alt="ícone do menu"/>
    </button>

    <nav id="menu-mobile" class="menu-mobile">
      <button>
        <span class="img-close">
          <img src="${imgClose}" alt="ícone de X para fechar"/>
        </span>
      </button>

      <button>
        <span>
          <img src="${imgHome}" alt="icone de home" href="#" />
          <span class="text-mobile">Home</span>
        </span>
      </button>

      <button>
        <span>
          <img src="${imgPublicar}" alt="icone para publicar um post" href="#"/>            
          <span class="text-mobile">Publicar</span>
        </span>
      </button>

      <button>
        <span class="logout">
          <img src="${imgSair}" alt="icone para sair do app"/>
          <span class="text-mobile">Sair</span>
        </span>
      </button>
    </nav>


     
  <main class="main">
      <section class="timeline">
        <section>
          <img class="logo-feed" src="${imgLogoTitulo}">
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

  // curtir
  function atualizaDisplayLike(postId, hasLiked) {
    const imagem = document.getElementById(`${postId}`).getElementsByTagName('img')[0];
    const contador = document.getElementById(`${postId}`).getElementsByTagName('label')[0];

    if (!hasLiked) {
      imagem.src = imagem.src.replace('liked-red', 'like');
      contador.innerText = Number(contador.innerText) - 1;
    } else {
      imagem.src = imagem.src.replace('like', 'liked-red');
      contador.innerText = Number(contador.innerText) + 1;
    }
  }

  // printar os posts na tela para o usuário

  const printPost = async () => {
    const arrayPost = await getPost();
    const idUser = auth.currentUser.uid;
    const templatePublish = arrayPost
      .map(
        (post) => {
          // ajustado para pegarverificar se o UID de quem escreveu o post bate com o UID logado
          const isAuthor = post.uid === auth.currentUser.uid; // post.username === username
          return `
            <section class="posts-users">
              <div class="text-and-likes">
                <div class="name-and-date">
                  <label class="name-post-user">${post.username || auth.currentUser.email}</label>
                </div>
                <div>
                  <textarea disabled class="text-post-user" id="${post.id}text-area">${post.text}</textarea>
                  <label class="date-and-hour">${post.date}</label>
                  <label class="date-and-hour">às ${post.hour}</label>
                </div> 
                <div class="like">
                  <button class="like-post-user" id="${post.id}like-post">
                    <img class="like-heart" src="${post.like && post.like.includes(auth.currentUser.uid) ? imgLiked : imgLike }" alt="ícone de like com coração">
                    <label id="likes-quantities">${post.like.length}</label>
                  </button>
                </div>
                ${isAuthor ? `
                <div class="group-buttons">       
                  <div class="delete">
                    <button class="btn-delete" id="${post.id}btn-delete">
                      <img src="${imgLixeira}" alt="icone para deletar o post">
                    </button>
                  </div>
                  <div class="edit">
                    <button class="btn-edit" id="${post.id}btn-edit">
                      <img src="${imgEditar}" alt="icone para deletar o post">
                    </button>
                    <button id="${post.id}btn-save" class="hidden">Salvar</button>
                  </div>
                </div>
                ` : ''}
              
            </section>
          `;
        },
      ).join('');
    container.querySelector('.post-container').innerHTML = templatePublish;

    arrayPost.forEach((post) => {
      const isAuthor = post.uid === idUser;
      if (isAuthor) {
        const btnDelete = document.getElementById(`${post.id}btn-delete`);
        const postSection = btnDelete.parentNode.parentNode.parentNode;
        btnDelete.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.confirm('Tem certeza que deseja excluir a publicação?')) {
            deletePost(post.id)
              .then(() => {
                postSection.remove();
              });
          }
        });

        const btnEdit = document.getElementById(`${post.id}btn-edit`);
        const textArea = document.getElementById(`${post.id}text-area`);
        const btnSave = document.getElementById(`${post.id}btn-save`);
        btnEdit.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.confirm('Tem certeza que deseja editar a publicação?')) {
            btnEdit.setAttribute('hidden', true);
            textArea.removeAttribute('disabled');
          }
        });

        btnSave.addEventListener('click', (e) => {
          e.preventDefault();
          editPost(post.id, textArea.value);
          textArea.setAttribute('disabled', true);
          btnEdit.removeAttribute('hidden');
        });
      }

      const btnLike = document.getElementById(`${post.id}like-post`);
      // const postSection = btnLike.parentNode.parentNode.parentNode;
      btnLike.addEventListener('click', (e) => {
        e.preventDefault();

        if (post.like && post.like.includes(idUser)) {
          unlikePost(post.id, idUser).then(() => {
            // removendo da interface
            post.like.splice(post.like.indexOf(idUser), 1);

            window.location.hash = '#feed';
            atualizaDisplayLike(`${post.id}like-post`, false);
          });
        } else {
          likePost(post.id, idUser).then(() => {
            // add elemento no array
            post.like.push(idUser);
            window.location.hash = '#feed';
            atualizaDisplayLike(`${post.id}like-post`, true);
          });
        }
        // window.location.reload()
      });
    });

    // deslike = usar remove
  };
  printPost();

  // pegar o post e armazenar no firabase

  const text = container.querySelector('.textarea');
  const buttonPublish = container.querySelector('.button-publish');
  buttonPublish.addEventListener('click', () => {
    if (text.value !== '') {
      const today = new Date();
      // const dataPostagem = today.toLocaleDateString();
      const username = auth.currentUser.displayName;
      const idUser = auth.currentUser.uid;

      newPost(text.value, today, username, idUser).then(() => {
        printPost();
        cleanPost();
      });
    } else {
      alert('Por favor, escreva algo para publicar!');
    }
  });

  // logout

  const logoutButtons = container.querySelectorAll('.logout');
  logoutButtons.forEach((logoutButton) => {
    logoutButton.addEventListener('click', () => {
      // funçao dentro do auth.js
      logout();
    });
  });

  return container;
};
