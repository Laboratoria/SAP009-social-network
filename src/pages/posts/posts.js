import { createNewPost, updatePost } from '../../firestore/DBFunctions';

export function openCreateNewPostModal() {
  const modalWrapper = document.getElementById('modal-wrapper');
  const modalContainer = document.getElementById('modal-container');
  modalContainer.classList.add('modal-container');
  modalContainer.innerHTML = `    
  <div class="modal-content">  
   <div class = "top-content">
    <p class="greeting-modal">O que você busca/oferece hoje?</p>   
    <button class="buttons" id="close">X</button>
   </div>
   <div class="form">
    <form>
     <input type='text' name='post-title' class='input-post-title' id='post-title' placeholder='Digite o título' maxlength='42'>
     <textarea class="input-post-text" id="post-text" name="post-text" cols="50" rows="4" placeholder='Digite o conteúdo do post' maxlength='300'></textarea>
      <div class="div-post-button">
        <p class="max-char"> Máximo 300 caracteres</p>
        <div class="bt">
        <button type='button' id='post-button' class='post-button' href='#timeline'>Post</button>
        </div>
        <div class="div-edit-delete>    
        </div>
      </div>
    </form>
   </div>      
  </div>`;

  modalWrapper.classList.add('show');
  const close = document.getElementById('close');
  close.addEventListener('click', () => {
    modalWrapper.classList.remove('show');
  });

  const postButton = document.getElementById('post-button');

  postButton.addEventListener('click', async () => {
    const inputTitle = document.querySelector('#post-title').value;
    const inputTextPost = document.querySelector('#post-text').value;

    if (inputTitle !== '' && inputTextPost !== '') {
      await createNewPost(inputTitle, inputTextPost);
      modalWrapper.classList.remove('show');
      location.reload();
    } else {
      alert('Preencha todos os campos');
    }
  });
}

export function editPost(post) {
  const modalWrapper = document.getElementById('modal-wrapper');
  const modalContainer = document.getElementById('modal-container');
  modalContainer.classList.add('modal-container');
  modalContainer.innerHTML = `    
    <div class="modal-content">  
      <div class = "top-content">
        <p class="greeting-modal">Editar Post</p>   
        <button class="buttons" id="close">X</button>
      </div>
    <div class="form">
     <form>
      <input type='text' name='post-title' class='edit-input-post-title' id='edit-post-title'> 
      <textarea class="edit-input-post-text" id="edit-post-text" name="post-text" cols="50" rows="4" placeholder='Digite o conteúdo do post'></textarea>
        <div class="div-post-button">
        <p class="max-char"> Máximo 300 caracteres</p>
          <div class="bt">
            <button type='button' id='edit-button' class='post-button' href='#timeline'>Salvar</button>
          </div>
    </div>
      </form>
     </div>
    </div>`;

  const editPostTitle = modalContainer.querySelector('.edit-input-post-title');

  const editTextPost = modalContainer.querySelector('.edit-input-post-text');

  editPostTitle.value = post.title;
  editTextPost.innerHTML = post.textPost;

  modalWrapper.classList.add('show');
  const close = document.getElementById('close');
  close.addEventListener('click', () => {
    modalWrapper.classList.remove('show');
  });

  const editButton = document.getElementById('edit-button');

  editButton.addEventListener('click', async () => {
    const inputTitle = document.querySelector('#edit-post-title').value;
    const inputTextPost = document.querySelector('#edit-post-text').value;
    if (inputTitle !== '' && inputTextPost !== '') {
      await updatePost(inputTitle, inputTextPost, post.id);
      modalWrapper.classList.remove('show');
    } else {
      alert('Preencha todos os campos');
    }
  });
}
