import editPosts from './editPosts';
import { deletePost } from '../../firebase/firestore';
import { redirect } from '../../redirect';

export default (showPosts, showTimeline) => {
  showPosts.forEach((post) => {
    const postContainer = document.createElement('div');

    const templatePost = `
    <div class='post'>
    <section class='box-post-timeline'>
      <div class='box-complete-post'>
        <div class='box-info-post'>
          <p id='user'>${post.id}<p/>
          <p id='anime-name'>${post.anime}</p>
          <p id='anime-episodes'>${post.episodes} episódios</p>
        </div>
      <details>
        <summary class='view-description'>Ver mais</summary>
           <div class='box-description'>
              <p id='post-description'>${post.description}</p>
           </div>
      </details>
          <div class="posts-btn">
            <button class='btn-posts' id='btn-edit'>Editar</button>
            <button class='btn-posts' id='btn-del'>Excluir</button>
          </div>
    </section>
    <div id="div-modal"></div>
  </div>
  </br>
    `;

    postContainer.innerHTML = templatePost;

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

    showTimeline.appendChild(postContainer);
  });
};
