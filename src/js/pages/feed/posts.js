import {
  like,
  editPost,
  getUserData,
  deletePost,
} from '../../../firebase/firestore';

import pen from '../../../img/pen-to-square-regular.png';
import trash from '../../../img/trash-can-regular.png';
import userIcon from '../../../img/user-icon.png';
import heartEmpty from '../../../img/heart-regular.png';
import heartFull from '../../../img/heart-solid.png';

export function postTemplate(post) {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-section');
  const countLikes = post.likes.length;
  const userData = getUserData();
  const isAuthor = userData.uid === post.userId;

  const editUserPost = () => {
    if (isAuthor) {
      return `
      <button type="button" class="footer-btn edit-btn">
        <img src="${pen}" class="edit-img post-img">
      </button>
      <button type="button" class="footer-btn delete-btn">
        <img src="${trash}" class="delete-img post-img">
      </button>
    `;
    }
    return '';
  };

  const template = `
  <div class="post-list">
   <hr> 
   <header class="header-post">
     <img src="${userIcon}" class="user-icon">
     <div class="username-post">${post.username}</div>
   </header>
   <div class="div-body-post" id="div-body-post-${post.postId}">${post.post}</div>
   <textarea hidden class="body-post" id="body-post-${post.postId}">${post.post}</textarea>
   <footer class="footer-post">
     <div class="post-date">${post.date.toDate().toLocaleDateString('pt-BR')}</div>
     <div class="post-edit-delete edit-delete">${editUserPost()}</div>
     <div class="post-like">
      <div class="number-like">${countLikes}</div>
      <button type="button" class="like-btn footer-btn">
       <img src="${heartEmpty}" class="not-liked post-img">
       <img src="${heartFull}" class="liked post-img">
      </button>
     </div>
   </footer>
  </div>
  `;
  postContainer.innerHTML = template;

  const likeButton = postContainer.querySelector('.like-btn');
  const disliked = postContainer.querySelector('.not-liked');
  const liked = postContainer.querySelector('.liked');
  const likesCounter = postContainer.querySelector('.number-like');
  const likesCollection = post.likes;

  if (likesCollection.includes(userData.uid)) {
    disliked.style.display = 'none';
    liked.style.display = 'flex';
  }

  likeButton.addEventListener('click', async () => {
    const result = await like(post.postId, userData.uid);
    likesCounter.innerHTML = result.count;
    if (result.true) {
      disliked.style.display = 'none';
      liked.style.display = 'flex';
    } else {
      disliked.style.display = 'flex';
      liked.style.display = 'none';
    }
  });

  const bodyPost = postContainer.querySelector(`#body-post-${post.postId}`);
  const divBodyPost = postContainer.querySelector(`#div-body-post-${post.postId}`);
  const editDeletePost = postContainer.querySelector('.post-edit-delete');

  const saveCancelBtn = `
    <div class="post-editing" id="post-editing-${post.postId}">
      <button type="button" class="save-btn editing-buttons">SAVE</button>
      <button type="button" class="cancel-btn editing-buttons">CANCEL</button>
    </div>
  `;
  function editingPost() {
    const saveBtn = postContainer.querySelector('.save-btn');
    const cancelBtn = postContainer.querySelector('.cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        bodyPost.innerHTML = post.post;
        divBodyPost.removeAttribute('hidden');
        bodyPost.setAttribute('hidden', true);
        editDeletePost.innerHTML = editUserPost();
        // eslint-disable-next-line no-use-before-define
        enableEdition();
      });
    }
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        editPost(post.postId, bodyPost.value);
        divBodyPost.removeAttribute('hidden');
        bodyPost.setAttribute('hidden', true);
      });
    }
  }

  function enableEdition() {
    const editBtn = postContainer.querySelector('.edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        bodyPost.removeAttribute('hidden');
        divBodyPost.setAttribute('hidden', true);
        editDeletePost.innerHTML = saveCancelBtn;
        editingPost();
      });
    }
  }
  enableEdition();

  const deleteBtn = postContainer.querySelector('.delete-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
    // eslint-disable-next-line no-alert
      if (window.confirm('Do you want to delet your post?')) {
        deletePost(post.postId);
        postContainer.remove();
      }
    });
  }

  return postContainer;
}
