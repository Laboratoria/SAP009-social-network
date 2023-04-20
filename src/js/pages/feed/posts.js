import { editPost, loggedUsersPost } from '../../../firebase/firestore';

export function postTemplate(post) {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-section');
  const template = `
  <div class="post-list">
   <hr> 
   <header class="header-post">
     <img src="img/user-icon.png" class="user-icon">
     <div class="username-post">${post.username}</div>
   </header>
   <textarea disabled class="body-post" id="body-post-${post.id}">${post.post}</textarea>
   <footer class="footer-post">
     <div class="post-date">${post.date.toDate().toLocaleDateString('pt-BR')}</div>
     <div class="post-edit-delete edit-delete">
      <button type="button" class="footer-btn" id="edit-btn-${post.id}">
        <img src="img/pen-to-square-regular.png" class="edit-img post-img">
      </button>
      <button type="button" class="footer-btn" id="delete-btn-${post.id}">
        <img src="img/trash-can-regular.png" class="delete-img post-img">
      </button>
     </div>
     <div class="post-editing edit-delete" id="post-editing-${post.id}">
      <button type="button" class="save-btn editing-buttons">SAVE</button>
      <button type="button" class="cancel-btn editing-buttons">CANCEL</button>
     </div>
     <div class="post-like">
      <button type="button" class="like-btn footer-btn">
       <img src="img/heart-regular.png" class="not-liked post-img">
       <img src="img/heart-solid.png" class="liked" post-img>
      </button>
      <div class="number-like">${post.likes}</div>
     </div>
   </footer>
  </div>
  `;
  postContainer.innerHTML = template;

  const bodyPost = postContainer.querySelector(`#body-post-${post.id}`);
  const postEditDelete = postContainer.querySelector('.post-edit-delete');
  const editBtn = postContainer.querySelector(`#edit-btn-${post.id}`);
  const postEditing = postContainer.querySelector(`#post-editing-${post.id}`);
  const saveBtn = postContainer.querySelector('.save-btn');
  const cancelBtn = postContainer.querySelector('.cancel-btn');
  const postLike = postContainer.querySelector('.post-like');

  if (loggedUsersPost) {
    postEditDelete.style.display = 'flex';
    postLike.style.display = 'none';
  }

  editBtn.addEventListener('click', () => {
    bodyPost.removeAttribute('disabled');
    postEditing.style.display = 'flex';
    postEditDelete.style.display = 'none';
  });

  saveBtn.addEventListener('click', () => {
    editPost(post.id, bodyPost.value);
    bodyPost.setAttribute('disabled');
    postEditing.style.display = 'none';
    postEditDelete.style.display = 'flex';
  });

  cancelBtn.addEventListener('click', () => {
    bodyPost.setAttribute('disabled');
    postEditing.style.display = 'none';
    postEditDelete.style.display = 'flex';
  });

  return postContainer;
}
