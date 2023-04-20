import { dislikePosts, getUsername, likePosts } from '../../../firebase/firestore';

export function postTemplate(post) {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-section');
  let countLikes = post.likes.length;
  const template = `
  <div class="post-list">
   <hr> 
   <header class="header-post">
     <img src="img/user-icon.png" class="user-icon">
     <div class="username-post">${post.username}</div>
   </header>
   <p class="body-post">${post.post}</p>
   <footer>
     <div class="post-date">${post.date}</div>
     <div class="post-like">
      <button type="button" id="like-button-${post.id}">
       <img src="img/heart-solid.png" class="liked" id="liked-${post.id}">
       <img src="img/heart-regular.png" class="not-liked" id="not-liked-${post.id}">
      </button>
      <div id="number-like">${countLikes}</div>
     </div>
   </footer>
  </div>
  `;
  postContainer.innerHTML = template;

  const likeButton = postContainer.querySelector(`#like-button-${post.id}`);
  const disliked = postContainer.querySelector(`#not-liked-${post.id}`);
  const liked = postContainer.querySelector(`#liked-${post.id}`);
  const likesCounter = postContainer.querySelector('#number-like');
  const likesUsers = post.likes;

  if (likesUsers.includes(getUsername)) {
    disliked.style.display = 'none';
    liked.style.display = 'flex';
  }

  likeButton.addEventListener('click', () => {
    if (likesUsers.includes(getUsername)) {
      dislikePosts(post.id, getUsername);
      disliked.style.display = 'flex';
      liked.style.display = 'none';
      countLikes -= 1;
      likesCounter.innerHTML = countLikes;
    } else {
      likePosts(post.id, getUsername);
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

  return postContainer;
}
