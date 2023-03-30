import editPosts from './editPosts';
import { deletePost } from '../../firebase/firestore';
import { redirect } from '../../redirect';
import { getUserId } from '../../firebase/auth';

export default (showPosts, showTimeline) => {
  const userId = getUserId();
  showPosts.forEach((post) => {
    const postContainer = document.createElement('div');

    const templatePost = `
    <div class='post'>
          <section class='box-post-timeline' data-section-post-id=${post.id}>
          <div class='box-complete-post'>
          <div class='box-info-post'>
            <p id='user'>${post.name}<p/>
            <p id='anime-name'>${post.anime}</p>
            <p id='anime-episodes'>${post.episodes} episódios</p>

            <button id="like">
              <div class="label">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.4 5.25C5.61914 5.25 3.25 7.3293 3.25 10.0298C3.25 11.8927 4.12235 13.4612 5.27849 14.7604C6.43066 16.0552 7.91714 17.142 9.26097 18.0516L11.5796 19.6211C11.8335 19.793 12.1665 19.793 12.4204 19.6211L14.739 18.0516C16.0829 17.142 17.5693 16.0552 18.7215 14.7604C19.8777 13.4612 20.75 11.8927 20.75 10.0298C20.75 7.3293 18.3809 5.25 15.6 5.25C14.1665 5.25 12.9052 5.92214 12 6.79183C11.0948 5.92214 9.83347 5.25 8.4 5.25Z" fill="black"/>
                </svg>
              </div>
              <div class="number" id="number"></div>
            </button>

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

    const btnLike = postContainer.querySelector('#like');
    const numberLike = postContainer.querySelector('#number');
    btnLike.addEventListener('click', () => {
      const likeValue = postContainer.querySelector('#number').textContent;
      const newValue = Number(likeValue) + 1;
      btnLike.classList.add('like');
      numberLike.innerHTML = newValue;
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
