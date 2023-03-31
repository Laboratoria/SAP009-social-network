import editPosts from './editPosts';
import { deletePost, deslikePost, likePost } from '../../firebase/firestore';
import { redirect } from '../../redirect';
import { getUserId } from '../../firebase/auth';
import { auth } from '../../firebase/app';

export default (showPosts, showTimeline) => {
  const userId = getUserId();
  showPosts.forEach((post) => {
    const postContainer = document.createElement('div');
    let countLikes = post.whoLiked.length;

    const templatePost = `
    <div class='post'>
          <section class='box-post-timeline' data-section-post-id=${post.id}>
          <div class='box-complete-post'>
          <div class='box-info-post'>
            <p id='user'>${post.name}<p/>
            <p id='anime-name'>${post.anime}</p>
            <p id='anime-episodes'>${post.episodes} episódios</p>

            <div id='like' class='display'>
              <svg id='empty-heart' xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-heart' viewBox='0 0 16 16'>
                  <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'/>
              </svg>
              <svg id='heart-fill' class='hidden' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>

              <span id='likes-counter'>${countLikes}</span>
            </div>

              <details>
            <summary class='view-description'>Ver mais</summary>
              <div class='box-description'>
                <p id='post-description'>${post.description}</p>
              </div>
              </details>
            <br>
            <div class="btns">
              <div class="div-btn-edit"></div>
              <div class="div-btn-del"></div>
            </div>
            </div>
          </section>
          <section class="div-modal"></section>
        </div>
        </br>
    `;

    postContainer.innerHTML = templatePost;

    const emptyHeart = postContainer.querySelector('#empty-heart');
    const heartFill = postContainer.querySelector('#heart-fill');
    const likesCounter = postContainer.querySelector('#likes-counter');
    const likesUsers = post.whoLiked;

    if (likesUsers.includes(auth.currentUser.displayName)) {
      emptyHeart.classList.add('hidden');
      heartFill.classList.remove('hidden');
    }

    emptyHeart.addEventListener('click', () => {
      emptyHeart.classList.add('hidden');
      heartFill.classList.remove('hidden');
      countLikes += 1;
      likesCounter.innerHTML = countLikes;
      likePost(post.id, auth.currentUser.displayName);
    });

    heartFill.addEventListener('click', () => {
      emptyHeart.classList.remove('hidden');
      heartFill.classList.add('hidden');
      countLikes -= 1;
      likesCounter.innerHTML = countLikes;
      deslikePost(post.id, auth.currentUser.displayName);
    });

    const delPost = postContainer.querySelector('.div-btn-del');
    const editPost = postContainer.querySelector('.div-btn-edit');

    if (userId === post.author) {
      editPost.innerHTML = '<button class="btn-edit">Editar</button>';
      const btnEdtit = postContainer.querySelector('.btn-edit');
      btnEdtit.addEventListener('click', () => {
        const divModal = postContainer.querySelector('.div-modal');
        divModal.appendChild(editPosts(post));
      });

      delPost.innerHTML = '<button class="btn-del">Excluir</button>';
      const btnDel = postContainer.querySelector('.btn-del');
      btnDel.addEventListener('click', () => {
        if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
          deletePost(post.id)
            .then(() => {
              redirect('#timeline');
            });
        }
      });
    }
    /*
    const btnLike = document.querySelector('#like');
    const number = document.querySelector('#number');

    btnLike.addEventListener('click', () => {
      const likeValue = document.querySelector('#number').textContent;
      const newValue = Number(likeValue) + 1;
      btnLike.classList.add('like');
      number.innerHTML = newValue;
    });
    */

    showTimeline.appendChild(postContainer);
  });
};
