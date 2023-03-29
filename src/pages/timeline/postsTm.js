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
    const btnEdit = postContainer.querySelector('#btn-edit');
    btnEdit.addEventListener('click', () => {
      const divModal = postContainer.querySelector('#div-modal');
      divModal.appendChild(editPosts(post));
    });

    const btnDel = postContainer.querySelector('#btn-del');
    btnDel.addEventListener('click', () => {
      if (window.confirm('Tem certeza que deseja excluir a publicação?')) {
        deletePost(post.id)
          .then(() => {
            redirect('#timeline');
          });
      }
    });
*/
    showTimeline.appendChild(postContainer);
  });
};
