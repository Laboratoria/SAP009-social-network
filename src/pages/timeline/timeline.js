import { LogOut, auth } from '../../firebase/auth.js';
import createHeader from '../../components/header.js';
import {
  deletePost, getAllUsersPosts, getLoggedUserAllPosts, likePosts,
} from '../../firestore/DBFunctions';
// import errorHandling from '../errorHandling.js';
import { editPost, openCreateNewPostModal } from '../posts/posts.js';

import ListPost from './listPosts.js';

export default () => {
  const user = auth.currentUser;
  console.log(user);

  const container = document.createElement('div');
  container.classList.add('container-timeline');
  const header = createHeader();
  header.classList.add('header-site');
  container.append(header);

  const template = `
    <div class="form-wrapper-timeline">
       <div>        
          <p class="greeting">Olá,</p> 
          <div class="div-greeting-button">
            <p class="greeting-name">${user.displayName}</p>
            <img src="./assets/bt-new-post.png" id="btn-new-post" class="" alt="logo da ConectAda">
          </div>
          <div class="div-post-type"><button type="button" id="last-posts" class="post-type">Últimos posts</button>
          <button type="button" id="user-posts" class="post-type">Seus posts</button>
          </div>
          ${ListPost()} 
        <div id="modal-wrapper">
        <div id="modal-container"></div>
        </div>
        <div class="div-logout-btn"> <button type="button" id="logout-button" class="button logout-btn" href="#login">Sair</button></div>
      </div>    
  `;

  container.innerHTML += template;

  const logoutButton = container.querySelector('#logout-button');

  logoutButton.addEventListener('click', () => {
    LogOut(user);
    window.location.replace('#login');
  });



  function showAllPosts(posts) {
    if (posts) {
      const mappedPosts = posts.map((post) => post);
      const postsByDateOrderAsc = mappedPosts.sort(
        (a, b) => b.timestamp - a.timestamp,
      );
      const postsList = document.querySelector('#post-list');
      postsList.innerHTML = postsByDateOrderAsc
        .map(
          (post) => `
        <article class="post-article">
          <div class="post-header">
            <div class="title">
            <p class="post-display-name">${post.displayName} escreveu:</p>
              <h2>${post.title} </h2>
            </div>
            <p class="dateTime">${post.dateTime}</p>
          </div>
           
            <p class="post-body">${post.textPost}</p>
            
            <div class="div-action-buttons">
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
              <button type='button' id='like-button-${post.id}' class='like-button'>Liker</button>
              <label id='like-label'>${post.likes.length}</label>
            </div>
        </article>`,
        )
        .join('');

      const likeButtons = postsList.querySelectorAll('.like-button');
      const labelLikes = postsList.querySelectorAll('.like-label');
      likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', async () => {
          const postId = likeButton.id;
          const index = postId.split('-').pop();
          const post = postsByDateOrderAsc.find(
            (postRef) => postRef.id === index,
          );
          const newLikes = await likePosts(post, auth.currentUser.uid);
          labelLikes.value = newLikes.length;
          showAllPosts(newLikes);
        });
      });
      const newPostButton = container.querySelector('#btn-new-post');
      const editButtons = postsList.querySelectorAll('.edit-button');
      const deleteButtons = postsList.querySelectorAll('.delete-button');

      newPostButton.addEventListener('click', openCreateNewPostModal);

      postsByDateOrderAsc.forEach((post, index) => {
        if (post.uid === auth.currentUser.uid) {
          editButtons[index].classList.remove('none');
          deleteButtons[index].classList.remove('none');
        }
      });

      editButtons.forEach((editButton) => {
        editButton.addEventListener('click', async () => {
          const postId = editButton.id;
          const index = postId.split('-').pop();
          const post = postsByDateOrderAsc.find(
            (postRef) => postRef.id === index,
          );
          await editPost(post);
        });
      });

      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', async () => {
          const postId = deleteButton.id;
          const index = postId.split('-').pop();
          await deletePost(index);
          getAllUsersPosts()
            .then((allPosts) => {
              const postsAfterDelete = allPosts;
              showAllPosts(postsAfterDelete);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
  }

  let allUsersPosts = [];
  getAllUsersPosts()
    .then((allPosts) => {
      allUsersPosts = allPosts;
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
  lastPosts.classList.add('active');
  lastPosts.addEventListener('click', () => {
    showAllPosts(allUsersPosts);
    lastPosts.classList.add('active');
   userPosts.classList.remove('active');
  });

  userPosts.addEventListener('click', () => {
    let allLoggedUserPosts = [];
    getLoggedUserAllPosts()
      .then((allPosts) => {
        allLoggedUserPosts = allPosts;
        console.log(allLoggedUserPosts);
        lastPosts.classList.remove('active');
        userPosts.classList.add('active');
        showAllPosts(allLoggedUserPosts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('Fim da solicitação inicial de posts de todos os users.');
      });
    console.log('gaga');
  });

  return container;
};
