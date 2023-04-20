import {
  dislikePosts,
  likePosts,
  editPost,
  getUserData,
} from '../../../firebase/firestore';

export function postTemplate(post) {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-section');
  const countLikes = post.likes;
  const userData = getUserData();
  const isAuthor = userData.uid === post.userId;

  const editUserPost = () => {
    if (isAuthor) {
      return `
      <button type="button" class="footer-btn edit-btn">
        <img src="img/pen-to-square-regular.png" class="edit-img post-img">
      </button>
      <button type="button" class="footer-btn delete-btn">
        <img src="img/trash-can-regular.png" class="delete-img post-img">
      </button>
    `;
    }
    return '';
  };

  const likePost = () => {
    if (!isAuthor) {
      return `
      <div class="number-like">${countLikes.length}</div>
      <button type="button" class="like-btn footer-btn">
        <img src="img/heart-regular.png" class="not-liked post-img">
        <img src="img/heart-solid.png" class="liked" post-img>
      </button>
    `;
    }
    return '';
  };

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
     <div class="post-edit-delete edit-delete">${editUserPost()}</div>
     <div class="post-like">${likePost()}</div>
   </footer>
  </div>
  `;
  postContainer.innerHTML = template;

  // const postLike = postContainer.querySelector('.post-like');
  const likeButton = postContainer.querySelector(`#like-button-${post.id}`);
  const disliked = postContainer.querySelector(`#not-liked-${post.id}`);
  const liked = postContainer.querySelector(`#liked-${post.id}`);
  // const likesCounter = postLike.querySelector('#number-like');

  if (likeButton) {
    if (countLikes.includes(userData.uid)) {
      disliked.style.display = 'none';
      liked.style.display = 'flex';
    }

    likeButton.addEventListener('click', () => {
      if (countLikes.includes(userData.uid)) {
        dislikePosts(post.id, userData.uid);
        disliked.style.display = 'flex';
        liked.style.display = 'none';
        // likesCounter.innerHTML = countLikes.length;
      } else {
        likePosts(post.id, userData.uid);
        disliked.style.display = 'none';
        liked.style.display = 'flex';
        // likesCounter.innerHTML = countLikes.length;
      }
    });
  }

  const bodyPost = postContainer.querySelector(`#body-post-${post.id}`);
  const editDeletePost = postContainer.querySelector('.post-edit-delete');
  const editBtn = postContainer.querySelector('.edit-btn');

  const saveCancelBtn = `
    <div class="post-editing edit-delete" id="post-editing-${post.id}">
      <button type="button" class="save-btn editing-buttons">SAVE</button>
      <button type="button" class="cancel-btn editing-buttons">CANCEL</button>
    </div>
  `;

  const saveBtn = postContainer.querySelector('.save-btn');
  const cancelBtn = postContainer.querySelector('.cancel-btn');
  console.log(editBtn);
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      bodyPost.removeAttribute('disabled');
      editDeletePost.innerHTML = '';
      editDeletePost.innerHTML = saveCancelBtn;
    });

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        editPost(post.id, bodyPost.value);
        bodyPost.setAttribute('disabled');
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        bodyPost.setAttribute('disabled');
        bodyPost.innerHTML = `${post.post}`;
      });
    }
  }
  return postContainer;
}
