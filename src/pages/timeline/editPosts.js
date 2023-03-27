import { editPost } from '../../firebase/firestore';
import { redirect } from '../../redirect';

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

  modalEdit.style.display = 'block';

  const closeModalButton = modalEdit.querySelector('#close-modal');
  closeModalButton.addEventListener('click', () => {
    modalEdit.style.display = 'none';
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
