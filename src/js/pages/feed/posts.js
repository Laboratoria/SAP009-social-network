import {
  dislikePosts,
  likePosts,
  editPost,
  getUserData,
} from '../../../firebase/firestore';

export function postTemplate(post) {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-section');
  let countLikes = post.likes.length;
  const userData = getUserData();
  const isAuthor = userData.uid === post.userId;

  const editUserPost = () => {
    if (isAuthor) {
      return `
      <button type="button" class="footer-btn" id="edit-btn-${post.id}">
        <img src="img/pen-to-square-regular.png" class="edit-img post-img">
      </button>
      <button type="button" class="footer-btn" id="delete-btn-${post.id}">
        <img src="img/trash-can-regular.png" class="delete-img post-img">
      </button>
    `;
    }
    return '';
  };

  const likePost = () => {
    if (!isAuthor) {
      return `
      <button type="button" class="like-btn footer-btn">
        <img src="img/heart-regular.png" class="not-liked post-img">
        <img src="img/heart-solid.png" class="liked" post-img>
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
     <img src="img/user-icon.png" class="user-icon">
     <div class="username-post">${post.username}</div>
   </header>
   <textarea disabled class="body-post" id="body-post-${post.id}">${post.post}</textarea>
   <footer class="footer-post">
     <div class="post-date">${post.date.toDate().toLocaleDateString('pt-BR')}</div>
     <div class="post-edit-delete edit-delete">${editUserPost}</div>
     <div class="post-like">${likePost}</div>
   </footer>
  </div>
  `;
  postContainer.innerHTML = template;

  const likeButton = postContainer.querySelector(`#like-button-${post.id}`);
  const disliked = postContainer.querySelector(`#not-liked-${post.id}`);
  const liked = postContainer.querySelector(`#liked-${post.id}`);
  const likesCounter = postContainer.querySelector('#number-like');
  const likesUsers = post.likes;

  if (likesUsers.includes(getUserData)) {
    disliked.style.display = 'none';
    liked.style.display = 'flex';
  }

  likeButton.addEventListener('click', () => {
    if (likesUsers.includes(userData)) {
      dislikePosts(post.id, userData);
      disliked.style.display = 'flex';
      liked.style.display = 'none';
      countLikes -= 1;
      likesCounter.innerHTML = countLikes;
    } else {
      likePosts(post.id, userData);
      disliked.style.display = 'none';
      liked.style.display = 'flex';
      countLikes += 1;
      likesCounter.innerHTML = countLikes;
    }
  });

  /* liked.addEventListener('click', () => {
    liked.classList.remove('hidden');
    liked.classList.add('hidden');
    countLikes -= 1;
    likesCounter.innerHTML = countLikes;
    dislikePosts(post.id, getUsername);
  });
 */
  /* likeButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (likePosts()) {
      liked.style.display = 'block';
    } else {
      disliked.style.display = 'none';
    }
    // Executar a lógica para incrementar o número de curtidas
    // e enviar uma solicitação ao servidor para atualizar o estado da postagem
    // Atualizar a interface do usuário para refletir o novo número de curtidas
  }); */
  const bodyPost = postContainer.querySelector(`#body-post-${post.id}`);

  const saveCancelBtn = `
    <div class="post-editing edit-delete" id="post-editing-${post.id}">
      <button type="button" class="save-btn editing-buttons">SAVE</button>
      <button type="button" class="cancel-btn editing-buttons">CANCEL</button>
    </div>
  `;

  const postEditing = postContainer.querySelector(`#post-editing-${post.id}`);

  const saveBtn = postContainer.querySelector('.save-btn');
  const cancelBtn = postContainer.querySelector('.cancel-btn');
  const editBtn = postContainer.querySelector(`#edit-btn-${post.id}`);

  if (isAuthor) {
    editBtn.addEventListener('click', () => {
      bodyPost.removeAttribute('disabled');
    });

    saveBtn.addEventListener('click', () => {
      editPost(post.id, bodyPost.value);
      bodyPost.setAttribute('disabled');
    });

    cancelBtn.addEventListener('click', () => {
      bodyPost.setAttribute('disabled');
      bodyPost.innerHTML = `${post.post}`;
      // colocar innerHTML
    });
  }

  return postContainer;
}
