import {
  newPost,
  editPost,
} from '../../firebase/firestore.js';

export default () => {
  const publishContainer = document.createElement('div');
  const publishScreen = `
   <section id='publication'>
    <img id='bumerangue-gif-publish' src='assets/imagens/bumerangue.gif'>
    <textarea id='publication-text-publish' name='textarea' placeholder='Qual ação deseja compartilhar?'></textarea>
    <div id='buttons-publication'>
    <button id='cancel-button' type='button'> Cancelar </button>
    <button id='publication-button-publish'> Publicar </button> <br> <br>
    </div>
    <p id='empty-post-message'> </p> 
    <h2 id='reactions-title'> Entendendo as reações</h2>
    <img id='reactions' src='assets/imagens/reacoes.gif'>
    
    </section>
   `;
  publishContainer.innerHTML = publishScreen;

  if (localStorage.getItem('editStatus') === 'true') {
    publishContainer.querySelector('#publication-text-publish').value = localStorage.getItem('postText');
  }

  const buttonPost = publishContainer.querySelector('#publication-button-publish');
  const emptyPostMessage = publishContainer.querySelector('#empty-post-message');

  buttonPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const postText = publishContainer.querySelector('#publication-text-publish').value;

    if (postText === '') {
      emptyPostMessage.innerHTML = '⚠️ POST VAZIO! Por favor, digite algo!';
    } else {
      if (localStorage.getItem('editStatus') === 'false') { // verifica se o valor da chave "editStatus" no armazenamento local é igual a "false", se for, significa que o usuário está criando um novo post.
        await newPost(postText); // E a função newPost(postText) é chamada.
      } else { // SE NÃO, se o valor da chave "editStatus" for diferente de "false":
        const postId = localStorage.getItem('postId'); // isso significa que o usuário está editando um post existente.
        await editPost(postId, postText); // Então, a função editPost(postId, postText) é chamada.
      }
      window.location.hash = '#feed'; // Independentemente de o usuário estar criando um novo post ou editando um post existente, vamos redirecioná-lo para o feed após a ação ser concluída com sucesso.
    }
  });
  const buttonCancel = publishContainer.querySelector('#cancel-button');

  buttonCancel.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#feed';
  });
  return publishContainer;
};
