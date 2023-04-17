/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import {
  getPosts,
  getPost,
  deletePost,
  likePost,
} from '../../firebase/firestore.js';
import { userUID, logOut } from '../../firebase/auth.js';

export default () => {
  const feedContainer = document.createElement('div');

  const feedScreenMenu = `
  <section class='register-container-feed'>
   <div id='menu-top'>
   <button> <img src='assets/imagens/logout.png' alt='Imagem sair' id='button-logout'> SAIR </button>
   <img id='bumerangue-gif-feed' src='assets/imagens/bumerangue.gif'>
   </div>
    <div id='time-line'> </div>
   <div id='menu-bottom'>
   <button> <img src='assets/imagens/perfil.png' id='profile'> PERFIL </button>
    <img src='assets/imagens/logo.png' id='feed-logo' alt='Logotipo QA- Qualidade de ações'>
    <button> <img src='assets/imagens/publicar.png' alt='Imagem publicação' id='feed-button-publish'> PUBLICAR </button>
    </div>
 </section>
 `;

  feedContainer.innerHTML = feedScreenMenu;

  const showPosts = async () => {
    const posts = await getPosts();
    const postTemplate = posts.map((post) => `
  <div class='main-post-feed'>
  <div class='name-post'> ${post.userName} </div>
  <div class='content-post'> ${post.text} </div>
  <div class='date-post'>${post.publishDate} </div> </div>
  <div class='likes-posts'>
  <button class='button-like-post' data-post-id=${post.id}> 💛 ${post.like.length} </button>
  <button class='button-equal-activity' data-post-id=${post.id}> 🤝 ${post.like.length} </button>
  <button class='button-physical-benefits' data-post-id=${post.id}> 😉 ${post.like.length} </button>
  <button class='button-sleep-benefits' data-post-id=${post.id}> 😴 ${post.like.length} </button>
  <button class='button-mood-benefits' data-post-id=${post.id}> 😁 ${post.like.length} </button>
  <button class='button-psychological-benefits' data-post-id=${post.id}> 💆 ${post.like.length} </button>
  </div>
  <div class='edit-delete-post-feed'>
  <button class='button-edit' data-post-id=${post.id} data-user-id=${post.userId}> <img src='assets/imagens/publicar.png'> </button>
  <button class='button-delete' data-post-id=${post.id} data-user-id=${post.userId}> <img src='assets/imagens/lixeira.png'> </button>
</div> </div>
    `);

    feedContainer.querySelector('#time-line').innerHTML = postTemplate;

    const publishPost = feedContainer.querySelector('#feed-button-publish');

    publishPost.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.hash = '#publish';
    });

    const buttonsDelete = feedContainer.querySelectorAll('.button-delete');
    buttonsDelete.forEach((button) => {
      if (userUID() === button.dataset.userId) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }

      button.addEventListener('click', async (e) => {
        if (confirm('Tem certeza que deseja excluir?')) {
          await deletePost(e.target.dataset.postId);
          window.location.reload();
        }
      });
    });

    const buttonsEdit = feedContainer.querySelectorAll('.button-edit');
    buttonsEdit.forEach((button) => {
      if (userUID() === button.dataset.userId) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }

      button.addEventListener('click', async (e) => {
        const post = await getPost(e.target.dataset.postId);
        localStorage.setItem('postId', post.id);
        localStorage.setItem('postText', post.text);
        localStorage.setItem('editStatus', true);
        window.location.hash = '#publish';
      });
    });

    const buttonLike = feedContainer.querySelectorAll('.button-like-post');

    buttonLike.forEach((button) => {
      button.addEventListener('click', async (e) => {
        const likeCount = await likePost(e.target.dataset.postId);
        e.target.innerHTML = `💛 ${likeCount.length}`;
      });
    });
  };

  const buttonEqualActivity = feedContainer.querySelectorAll('.button-equal-activity');

  buttonEqualActivity.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const equalActivityCount = await likePost(e.target.dataset.postId);
      e.target.innerHTML = `🤝 ${equalActivityCount.length}`;
    });
  });

  const buttonPhysicalBenefits = feedContainer.querySelectorAll('.button-physical-benefits');

  buttonPhysicalBenefits.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const physicalBenefitsCount = await likePost(e.target.dataset.postId);
      e.target.innerHTML = `😉 ${physicalBenefitsCount.length}`;
    });
  });

  const buttonSleepBenefits = feedContainer.querySelectorAll('.button-sleep-benefits');

  buttonSleepBenefits.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const sleepBenefitsCount = await likePost(e.target.dataset.postId);
      e.target.innerHTML = `😴 ${sleepBenefitsCount.length}`;
    });
  });

  const buttonMoodBenefits = feedContainer.querySelectorAll('.button-mood-benefits');

  buttonMoodBenefits.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const moodBenefitsCount = await likePost(e.target.dataset.postId);
      e.target.innerHTML = `😁 ${moodBenefitsCount.length}`;
    });
  });

  const buttonPsychologicalBenefits = feedContainer.querySelectorAll('.button-psychological-benefits');

  buttonPsychologicalBenefits.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const psychologicalBenefitsCount = await likePost(e.target.dataset.postId);
      e.target.innerHTML = `💆 ${psychologicalBenefitsCount.length}`;
    });
  });

  const buttonLogout = feedContainer.querySelector('#button-logout');
  buttonLogout.addEventListener('click', (event) => {
    event.preventDefault();
    logOut();
    window.location.hash = '#login';
  });

  showPosts();

  return feedContainer;
};
