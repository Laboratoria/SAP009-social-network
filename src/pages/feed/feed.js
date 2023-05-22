import { logOut } from '../../firebase/auth';
import {
  addPost, printPost, deletePost, editPost,
} from '../../firebase/config';

export default () => {
  const containerFeed = document.createElement('div');

  const feedScreen = `
  <section id="imagens">
  <img src="imagens/logo-pagina-de-login.png" width="70px" alt="logo-connect">
  <img src="imagens/web-content.png" width="30px" alt="feed">
  <img src="imagens/sair.png" width="30px" alt="sair" id="logOut">
  </section>
  <section id="postagem">
  <h1>O que você gostaria de compartilhar?</h1>
  <textarea name="digitar-post" id="text-area" cols="30" rows="10" placeholder="Qual seu produto queridinho? 
   Qual seu corte favorito?" ></textarea>
  <input type="button" value="Postar" id="post-button">
  <p id="post-message"> </p>
   </section>
  
   <section id = "post-screen">
   </section>
      `;

  containerFeed.innerHTML = feedScreen;
  const textArea = containerFeed.querySelector('#text-area');
  const buttonPost = containerFeed.querySelector('#post-button');
  const imglogOut = containerFeed.querySelector('#logOut');
  const printFeed = containerFeed.querySelector('#post-screen');
  const messagePost = containerFeed.querySelector('#post-message');

  async function showPost() {
    const templateFeed = await printPost();
    // eslint-disable-next-line max-len
    templateFeed.sort((a, b) => b.date - a.date); // Ordenar o array pelo campo 'date' em ordem cronológica
    printFeed.innerHTML = templateFeed
      .map((post) => {
        const date = post.date.toDate(); // Converter o objeto Timestamp para um objeto Date
        const formattedDate = date.toLocaleDateString(); // Formatar a data como uma string legível
        return `<section class = 'content-post-feed'>
                <div class='user-post'>${post.username}</div>
                <div class='content-post' id='content-post${post.id}' contenteditable="false">${post.post}</div>
                <div class='date-post'>${formattedDate}</div>
                </section>
                <div id="edit-delete-post-feed">
                <img class="button-edit" src="imagens/editar.png" data-post-id=${post.id} data-user- 
                 id=${post.userId} alt="Editar">
                <img class="button-delete" src="imagens/excluir.png" data-post-id=${post.id} data-user- 
                 id=${post.userId} alt="Excluir">
                 <button class="salvar" id='salvar${post.id}' hidden>Salvar</button>
          </div>`;
      })
      .join('');
  }

  showPost();

  printFeed.addEventListener('click', (e) => {
    if (e.target.classList.contains('button-delete')) {
      deletePost(e.target.dataset.postId);
    } else if (e.target.classList.contains('button-edit')) {
      const contentPost = printFeed.querySelector(`#content-post${e.target.dataset.postId}`);
      const salvarBtn = printFeed.querySelector(`#salvar${e.target.dataset.postId}`);
      contentPost.setAttribute('contenteditable', true);
      contentPost.focus();
      salvarBtn.removeAttribute('hidden');

      salvarBtn.addEventListener('click', () => {
        const postId = e.target.dataset.postId;
        const newPostData = contentPost.innerHTML || '';
        editPost(postId, newPostData);
        // Remover o atributo contenteditable e ocultar o botão de salvar após a edição
        contentPost.removeAttribute('contenteditable');
        salvarBtn.setAttribute('hidden', true);
      });
    }
  });

  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();
    if (textArea.value === '') {
      // eslint-disable-next-line no-alert
      messagePost.innerHTML = ' POST VAZIO! Por favor, digite algo!';
    } else {
      const date = new Date();
      const username = 'Michele';
      addPost(date, textArea.value, username);
      textArea.value = ''; // Limpar o campo de texto após a postagem
      await showPost(); // Atualizar o feed de postagens
    }
  });

  imglogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#login';
      });
  });

  return containerFeed;
};
