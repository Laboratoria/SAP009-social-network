import {
  dislikePosts,
  likePosts,
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
  let countLikes = post.likes.length;
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
      <div class="number-like">${countLikes}</div>
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
   <textarea disabled class="body-post" id="body-post-${post.id}">${post.post}</textarea>
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

  likeButton.addEventListener('click', () => {
    if (likesCollection.includes(userData.uid)) {
      dislikePosts(post.id, userData.uid);
      disliked.style.display = 'flex';
      liked.style.display = 'none';
      countLikes -= 1;
      likesCounter.innerHTML = countLikes;
    } else {
      likePosts(post.id, userData.uid);
      disliked.style.display = 'none';
      liked.style.display = 'flex';
      countLikes += 1;
      likesCounter.innerHTML = countLikes;
      likesCollection.push(userData.uid);
    }
  });

  const bodyPost = postContainer.querySelector(`#body-post-${post.id}`);
  const editDeletePost = postContainer.querySelector('.post-edit-delete');
  // const postEditing = postContainer.querySelector('.post-editing');
  const editBtn = postContainer.querySelector('.edit-btn');

  const saveCancelBtn = () => {
    if (editBtn) {
      return `
    <div class="post-editing" id="post-editing-${post.id}">
      <button type="button" class="save-btn editing-buttons">SAVE</button>
      <button type="button" class="cancel-btn editing-buttons">CANCEL</button>
    </div>
  `;
    }
    return '';
  };

  const postEditing = postContainer.querySelector(`#post-editing-${post.id}`);

  const saveBtn = postContainer.querySelector('.save-btn');
  const cancelBtn = postContainer.querySelector('.cancel-btn');

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      bodyPost.removeAttribute('disabled');
      editDeletePost.innerHTML = '';
      editDeletePost.innerHTML = saveCancelBtn();
    });
  }
  console.log(cancelBtn);
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      console.log('clicked');
      bodyPost.setAttribute('disabled');
      bodyPost.innerHTML = `${post.post}`;
    });
  }
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      editPost(post.id, bodyPost.value);
      bodyPost.setAttribute('disabled');
    });
  }

  const deleteBtn = postContainer.querySelector('delete-btn');
  console.log(deleteBtn);
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
