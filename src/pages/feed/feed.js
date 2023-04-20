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
        <figure id='button-logout-sair'>
        <img src='assets/imagens/logout.png' alt='Imagem sair'>  
        </figure>
        <img id='bumerangue-gif-feed' src='assets/imagens/bumerangue.gif'>
    </div>
    <div id='time-line'> </div>
    <div id='menu-bottom'>
      <figure id='profile'>
      <img src='assets/imagens/perfil.png'> PERFIL 
      </figure>
      <img src='assets/imagens/logo.png' id='feed-logo' alt='Logotipo QA- Qualidade de ações'>
      <figure id='button-publish'>
       <img src='assets/imagens/publicar.png' alt='Imagem publicação'> PUBLICAR 
      </figure>
    </div>
  </div>
 </section>
 `;

  feedContainer.innerHTML = feedScreenMenu;

  const showPosts = async () => {
    const posts = await getPosts();
    const postTemplate = posts.map((post) => `
    <div>
    <div class='main-post-feed'>
    <div class='name-post'> ${post.userName} </div> 
    <div class='date-post'>${post.publishDate} </div> 
    <div class='content-post'> ${post.text} </div> 
    </div>
  <div class='likes-posts'>
  <figure class='button-like-post' data-post-id=${post.id}> 💛 ${post.like.length}
  </figure>
  <figure class='button-equal-activity' data-post-id=${post.id}> 🤝 
  </figure>
  <figure class='button-physical-benefits' data-post-id=${post.id}> 😉 
   </figure>
  <figure class='button-sleep-benefits' data-post-id=${post.id}> 😴 
  </figure>
  <figure class='button-mood-benefits' data-post-id=${post.id}> 😁
  </figure>
  <figure class='button-psychological-benefits' data-post-id=${post.id}> 💆 
  </figure>
  </div>
  <div class='edit-delete-post-feed'>
  <figure class='button-edit' data-post-id=${post.id} data-user-id=${post.userId}> 
  ✏️
  </figure>
  <figure class='button-delete' data-post-id=${post.id} data-user-id=${post.userId}>
  🗑️
  </figure>
</div> 
</div>
</div>
`);

    feedContainer.querySelector('#time-line').innerHTML = postTemplate;

    const publishPost = feedContainer.querySelector('#button-publish');

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
  // const buttonEqualActivity = feedContainer.querySelectorAll('.button-equal-activity');

  // buttonEqualActivity.forEach((button) => {
  //   button.addEventListener('click', async (e) => {
  //     const equalActivityCount = await likePost(e.target.dataset.postId);
  //     e.target.innerHTML = `🤝 ${equalActivityCount.length}`;
  //   });
  // });

  // const buttonPhysicalBenefits = feedContainer.querySelectorAll('.button-physical-benefits');

  // buttonPhysicalBenefits.forEach((button) => {
  //   button.addEventListener('click', async (e) => {
  //     const physicalBenefitsCount = await likePost(e.target.dataset.postId);
  //     e.target.innerHTML = `😉 ${physicalBenefitsCount.length}`;
  //   });
  // });

  // const buttonSleepBenefits = feedContainer.querySelectorAll('.button-sleep-benefits');

  // buttonSleepBenefits.forEach((button) => {
  //   button.addEventListener('click', async (e) => {
  //     const sleepBenefitsCount = await likePost(e.target.dataset.postId);
  //     e.target.innerHTML = `😴 ${sleepBenefitsCount.length}`;
  //   });
  // });

  // const buttonMoodBenefits = feedContainer.querySelectorAll('.button-mood-benefits');

  // buttonMoodBenefits.forEach((button) => {
  //   button.addEventListener('click', async (e) => {
  //     const moodBenefitsCount = await likePost(e.target.dataset.postId);
  //     e.target.innerHTML = `😁 ${moodBenefitsCount.length}`;
  //   });
  // });

  // eslint-disable-next-line max-len
  // const buttonPsychologicalBenefits = feedContainer.querySelectorAll('.button-psychological-benefits');

  // buttonPsychologicalBenefits.forEach((button) => {
  //   button.addEventListener('click', async (e) => {
  //     const psychologicalBenefitsCount = await likePost(e.target.dataset.postId);
  //     e.target.innerHTML = `💆 ${psychologicalBenefitsCount.length}`;
  //   });
  // });

  const buttonLogout = feedContainer.querySelector('#button-logout-sair');
  buttonLogout.addEventListener('click', (event) => {
    event.preventDefault();
    logOut();
    window.location.hash = '#login';
  });

  showPosts();

  return feedContainer;
};
