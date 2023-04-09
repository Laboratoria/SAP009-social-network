import { auth } from '../../firebase/auth.js';
import Header from '../../components/header.js';
import {
  deletePost, getAllUsersPosts, getLoggedUserAllPosts, getLoggedUserLikes, likePosts
} from '../../firestore/DBFunctions';
// import errorHandling from '../errorHandling.js';
import { editPost, openCreateNewPostModal } from '../posts/posts.js';

import ListPost from './listPosts.js';

export default () => {
  const user = auth.currentUser;
  console.log(user);

  const container = document.createElement('div');

  container.classList.add('container-timeline');
  const header = Header();

  header.classList.add('header-site');
  container.appendChild(header);

  const template = ` 
    <div class="form-wrapper-timeline">
       <div>        
       <div class="div-name-button">
          <p class="greeting">Olá,</p> 
          <div class="div-greeting-button">
            <p class="greeting-name">${user.displayName}</p>
            <img src="./assets/bt-new-post.png" id="btn-new-post" class="" alt="logo da ConectAda">
          </div>
          </div>
          <div class="timeline-content">
          <div class="div-post-type"><button type="button" id="last-posts" class="post-type">Últimos posts</button>
          <button type="button" id="user-posts" class="post-type">Meus posts</button>
          <button type="button" id="user-favorites" class="post-type">Meus favoritos</button>
          </div>
          
          <div class="container-postList">
          ${ListPost()} 
          </div>
          </div>
        <div id="modal-wrapper">
        <div id="modal-container"></div>
        </div>       
      </div>    
  `;

  container.innerHTML += template;

  function orderPostsByDateAsc(posts) {
    const postsByDateOrderAsc = posts.sort(
      (a, b) => b.timestamp - a.timestamp,
    );
    return postsByDateOrderAsc;
  }

  function showAllPosts(posts) {
    if (posts) {
      console.log(posts);
      const mappedPosts = [];
      posts.forEach((post) => {
        mappedPosts.push(post);
      });

      const postsList = document.querySelector('#post-list');

      postsList.innerHTML = mappedPosts
        .map(
          (post) => `
        <article class="post-article">
          <div class="post-header">
            <div class="title">
            <p class="post-display-name"><strong>${post.displayName}</strong> escreveu:</p>
              <h2>${post.title} </h2>
            </div>
            <p class="dateTime">Publicado em ${post.dateTime}${post.updateDateTime !== '' ? ` | Atualizado em ${post.updateDateTime}` : ''}</p>
          </div>
           
            <p class="post-body">${post.textPost}</p>
            
            <div class="div-action-buttons">
                <div id="div-like" class="div-like">
                     <button type='button' id='like-button-${post.id}' class='like-button'>
                ${!post.likes.includes(auth.currentUser.uid) ? `<span class="material-icons like">
            star_border
            </span> ` : `<span class="material-icons like">
            star
            </span>`}
             </button>
              
              <label id='like-labl' class="like-label">${post.likes.length}</label>
              </div>
            <div>
              <button type='button' id='edit-button-${post.id}' class='edit-button none'>
                <span class="material-icons edit" alt='ícone de editar'>
              edit_note
                </span>
              </button>
              <button type='button' id='delete-button-${post.id}' class='delete-button none'>
                <span class="material-icons delete" alt='ícone de lixeira'>
              delete_forever
                </span>
              </button>
          </div>
            </div>
        </article>`,
        )
        .join('');
      //         <div class="div-action-buttons">
      //         <div id="div-like" class="div-like">
      //       <button type='button' id='like-button-${post.id}' class='like-button'>
      //        ${post.likes.find(like => like.uid === auth.currentUser.uid)  ? `<span class="material-icons like">
      //       star_border
      //       </span> ` : `<span class="material-icons like">
      //       star
      //       </span>`}
      //        </button>

      //       <label id='like-labl' class="like-label">${post.likes.length}</label>
      //       </div>
      // //<label id='like-label' class="like-label">${post.likes}</label> 
      // PARA O SONHO DE MOSTRAR QUEM CURTIU
      const likeButtons = postsList.querySelectorAll('.like-button');
      const labelLikes = postsList.querySelectorAll('.like-label');
      likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', async () => {
          const postId = likeButton.id;
          const index = postId.split('-').pop();
          const post = mappedPosts.find(
            (postRef) => postRef.id === index,
          );
          const newLikes = await likePosts(post, auth.currentUser.uid);
          labelLikes.value = newLikes.length;
          console.log(newLikes);
          if (userFavorites.classList.contains('active')) {
            const userLikes = await getLoggedUserLikes();
            showAllPosts(userLikes);
          } else if (userPosts.classList.contains('active')) {
            const loggedUserPosts = await getLoggedUserAllPosts();
            orderPostsByDateAsc(loggedUserPosts);
            showAllPosts(loggedUserPosts);
          } else {
            orderPostsByDateAsc(newLikes);
            showAllPosts(newLikes);
          }
        });
      });

      const newPostButton = container.querySelector('#btn-new-post');
      const editButtons = postsList.querySelectorAll('.edit-button');
      const deleteButtons = postsList.querySelectorAll('.delete-button');

      newPostButton.addEventListener('click', openCreateNewPostModal);

      mappedPosts.forEach((post, index) => {
        if (post.uid === auth.currentUser.uid) {
          editButtons[index].classList.remove('none');
          deleteButtons[index].classList.remove('none');
        }
      });

      editButtons.forEach((editButton) => {
        editButton.addEventListener('click', async () => {
          const postId = editButton.id;
          const index = postId.split('-').pop();
          const post = mappedPosts.find(
            (postRef) => postRef.id === index,
          );
          await editPost(post);
        });
      });

      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', async () => {
          await openDeleteModal();
          const postId = deleteButton.id;
          const index = postId.split('-').pop();
          const all = await deletePost(index);
          if (lastPosts.classList.contains('active')) {
            const allPosts = await getAllUsersPosts();
            orderPostsByDateAsc(allPosts);
            showAllPosts(allPosts);
          } else if (userFavorites.classList.contains('active')) {
            showAllPosts(all);
          } else if (userPosts.classList.contains('active')) {
            const userPosts = await getLoggedUserAllPosts();
            orderPostsByDateAsc(userPosts);
            showAllPosts(userPosts);
          }
        });
      });
    }
  }

  let allUsersPosts = [];
  getAllUsersPosts()
    .then((allPosts) => {
      allUsersPosts = allPosts;
      orderPostsByDateAsc(allUsersPosts);
      showAllPosts(allUsersPosts);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('Fim da solicitação inicial de posts de todos os users.');
    });

  const userPosts = container.querySelector('#user-posts');
  const lastPosts = container.querySelector('#last-posts');
  const userFavorites = container.querySelector('#user-favorites');

  lastPosts.classList.add('active');
  lastPosts.addEventListener('click', () => {
    getAllUsersPosts()
      .then((allPosts) => {
        allUsersPosts = allPosts;
        orderPostsByDateAsc(allUsersPosts);
        showAllPosts(allUsersPosts);
        userPosts.classList.remove('active');
        userFavorites.classList.remove('active');
        lastPosts.classList.add('active');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('Fim da solicitação inicial de posts de todos os users.');
      });
  });

  userPosts.addEventListener('click', () => {
    let allLoggedUserPosts = [];
    getLoggedUserAllPosts()
      .then((allPosts) => {
        allLoggedUserPosts = allPosts;
        lastPosts.classList.remove('active');
        userFavorites.classList.remove('active');
        userPosts.classList.add('active');
        orderPostsByDateAsc(allLoggedUserPosts);
        showAllPosts(allLoggedUserPosts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('Fim da solicitação inicial de TODOS os posts do USER LOGADO.');
      });
  });

  userFavorites.addEventListener('click', () => {
    let userLikedPosts = [];
    getLoggedUserLikes()
      .then((allPosts) => {
        userLikedPosts = allPosts;
        lastPosts.classList.remove('active');
        userPosts.classList.remove('active');
        userFavorites.classList.add('active');
        showAllPosts(userLikedPosts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('Fim da solicitação inicial de posts FAVORITOS do user LOGADO.');
      });
  });

  function openDeleteModal() {
    return new Promise((resolve, reject) => {
      const modalWrapper = document.getElementById('modal-wrapper');
      const modalContainer = document.getElementById('modal-container');
      modalContainer.classList.add('modal-container');
      modalContainer.innerHTML = `    
        <div class="modal-content-delete"> 
        <div class="modal-close-button">
        <button class="buttons" id="close-delete-modal"><span class="material-icons close">
        close
        </span></button>
        </div> 
          <div class="delete-top-content">
            <p class="delete-modal-text">Você tem certeza de que deseja apagar esse post?</p>   
            
          </div>
          <div class="form-delete">
            <form>
            
            <p class="alert-delete-text">Essa ação não poderá ser desfeita e o post será removido.</p>
              <div class="div-delete-cancel-button">        
                  <button type='button' id='cancel-button' class='post-button' href='#timeline'>Cancelar</button>
                  <button type='button' id='final-delete-button' class='post-button' href='#timeline'>Apagar</button>
                
                
              </div>
            </form>
          </div>      
        </div>`;

      modalWrapper.classList.add('show');
      const closeDeleteModal = document.getElementById('close-delete-modal');
      closeDeleteModal.addEventListener('click', () => {
        modalWrapper.classList.remove('show');
        reject(new Error('Modal closed without confirming delete'));
      });

      const modal = document.querySelector('.modal-container');

      modalWrapper.addEventListener('click', (event) => {
        if (!modal.contains(event.target)) {
          modalWrapper.classList.remove('show');
          reject(new Error('Modal closed without confirming delete'));
        }
      });

      const cancelButton = document.querySelector('#cancel-button');
      const finalDeleteButton = document.querySelector('#final-delete-button');

      cancelButton.addEventListener('click', async () => {
        modalWrapper.classList.remove('show');
        reject(new Error('Delete cancelled'));
      });

      finalDeleteButton.addEventListener('click', async () => {
        modalWrapper.classList.remove('show');
        resolve(true);
        const loggedUserLikes = await getLoggedUserLikes();
        showAllPosts(loggedUserLikes);
      });
    });
  }

  return container;
};
