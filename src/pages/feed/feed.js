import { salvarPost, pegarPost, deletarPost } from '../../firebase/firestore.js';

import { auth } from '../../firebase/firebase.js';

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
              <button class="btn-postar" id="bntPublicar">
                  <img class='postar-img' src='./img/checked.png' alt='logo-google'>
                  </button>
              </div>
          </div>
      </section>
      <section class="feed-postado"></section>
     </section> 
     </div>
     </main>
     `;

  container.innerHTML = template;

  const printPost = async () => {
    const arrayPosts = await pegarPost();
    const postList = arrayPosts.map((posts) => `
      <section class="areaPostado" id="${posts.id}">
        <div class="postado">
        <ul>
        <li>
                  <div> 
                  <div class="position-user-name">
                  <img class="img-user-name" src="./img/profile-user.png" alt="user-name">
                  <p class="user-name">${posts.username}</p>
                  <p class ="dataPost">${posts.date}</p>
                  </div>
                  <textarea disabled name="" id="txt-area-postado" cols="70" rows="5">${posts.text}</textarea>
                  <div class="position-btn-postar">
                  ${posts.userId === auth.currentUser.uid ? `  
                  <button id="${posts.id}editar" class="btn-postar editado">
                  <img class='editar-img' src='./img/editar-informacao.png' alt='logo-google'>
                    </button>
                    <button id="${posts.id}deletar" class="btn-postar delete">
                      <img class='excluir-img' src='./img/botao-apagar.png' alt='logo-google'>
                      </button>` : ''}
                
                      <button id="${posts.id}like" class="btn-postar like">
                     <img class='curtir-img' src='./img/ame.png' alt='logo-google'>
                     <label id="likes-quantities">${posts.like}</label>
                     </button>
                     </div>
                     </div>
                  </li>
                  </ul>
          </div>
      </section>     
    `).join('');

    container.querySelector('.feed-postado').innerHTML = postList;

    arrayPosts.forEach(post => {
      const btnDeletar = document.getElementById(post.id + 'deletar');
      btnDeletar.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
          deletarPost(post.id)
            .then(() => {
              const areaPostado = document.getElementById(post.id);
              areaPostado.remove();
            });
        };
      });
    });

    arrayPosts.forEach(post => {
      const btnEditar = document.getElementById(post.id + 'editar');
      btnEditar.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.confirm('Tem certeza de que deseja editar a publicação?')) {
          editarPosts(post.id)
            .then(() => {
              const areaPostado = document.getElementById(post.id);
              areaPostado.remove();
            });
        }
      });
    });
  };
  printPost();

  const textArea = container.querySelector('#txt-area');
  const btnPublicar = container.querySelector('#bntPublicar');
  btnPublicar.addEventListener('click', () => {
    if (textArea.value !== '') {
      const today = new Date();
      const userName = auth.currentUser.displayName;
      const idUser = auth.currentUser.uid;

      salvarPost(today, idUser, textArea.value, userName).then(() => {
        printPost();
      });
    } else { alert('Por favor, preencha o campo de postagem!'); }
  });

  const btnSair = container.querySelector('.btn-sair');
  btnSair.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return container;
};
