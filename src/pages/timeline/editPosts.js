import { editPost } from '../../firebase/firestore';
import { redirect } from '../../redirect';

export const editPosts = async () => {
  const container = document.createElement('div');
  const groupArr = await editPost();
  const postsTemplate = groupArr.map((post) => {
    const postTemplate = `
      <section id="modal" data-section-post-id=${post.id}>
      <div class="modal-header">
        <button id="close-modal">X</button>
      </div>
      <div class="modal-body">
        <form class="modal-form">
          <div class="single-input">
            <input required type="text" id="anime" class="input" data-anime-id=${post.anime}>
            <label for="anime">Nome do anime</label>
          </div>
  
          <div class="single-input">
            <input required type="text" id="episodes" class="input" data-episodes-id=${post.episodes}>
            <label for="episodes">Quantidade de episódios</label>
          </div>
        </form>
  
        <textarea style="resize: none" id="post-area" placeholder="Fale sobre o anime aqui" class="input" data-description-id=${post.description}>data-description-id=${post.description}</textarea>
        <button id="post-button">Publicar</button>
      </div>
    </section>
      `;

    return postTemplate;
  }).join('');
    container.innerHTML += postsTemplate;

  // showPosts();

  return container;
};

/*
export const modalEditPosts = async () => {
  const modalEdit = document.createElement('div');
  const groupArr = await editPost();
  const postsTemplate = groupArr.map((post) => {
    const template = `
    <section id="modal" data-section-post-id=${post.id}>
    <div class="modal-header">
      <button id="close-modal">X</button>
    </div>
    <div class="modal-body">
      <form class="modal-form">
        <div class="single-input">
          <input required type="text" id="anime" class="input" value="${post.anime}">
          <label for="anime">Nome do anime</label>
        </div>

        <div class="single-input">
          <input required type="text" id="episodes" class="input" value="${post.episodes}">
          <label for="episodes">Quantidade de episódios</label>
        </div>
      </form>

      <textarea style="resize: none" id="post-area" placeholder="Fale sobre o anime aqui" class="input" value="${post.description}">${post.description}</textarea>
      <button id="post-button">Publicar</button>
    </div>
  </section>
    `;

    postsTemplate.innerHTML = template;
  });
  return modalEdit;
};
*/

/*
export default (post) => {
  const modalEdit = document.createElement('div');

  modalEdit.innerHTML = `
  <section id="modal">
    <div class="modal-header">
      <button id="close-modal">X</button>
    </div>
    <div class="modal-body">
      <form class="modal-form">
        <div class="single-input">
          <input required type="text" id="anime" class="input" >
          <label for="anime">Nome do anime</label>
        </div>

        <div class="single-input">
          <input required type="text" id="episodes" class="input">
          <label for="episodes">Quantidade de episódios</label>
        </div>
      </form>

      <textarea style="resize: none" id="post-area" placeholder="Fale sobre o anime aqui" class="input"></textarea>
      <button id="post-button">Publicar</button>
    </div>
  </section>

  `;

  modalEdit.style.display = 'block';

  const closeModalButton = modalEdit.querySelector('#close-modal');
  closeModalButton.addEventListener('click', () => {
    if (window.confirm('Tem certeza que deseja sair? Caso você saia, as alterações não serão salvas')) {
      modalEdit.style.display = 'none';
    }
  });

  const postButton = modalEdit.querySelector('#post-button');

  postButton.addEventListener('click', () => {
    const editedPost = {
      anime: modalEdit.querySelector('#anime').value,
      episodes: modalEdit.querySelector('#episodes').value,
      description: modalEdit.querySelector('#post-area').value,
    };

    editPost(post.id, editedPost)
      .then(() => {
        alert('Publicação alterada com sucesso');
        redirect('#timeline');
      });
  });

  return modalEdit;
};
*/
