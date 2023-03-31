/* eslint-disable no-use-before-define */

// import { doc } from 'firebase/firestore';
import { LogOut, auth } from '../../firebase/auth.js';
import createHeader from '../../components/header.js';
import {
  getLoggedUserAllPosts, deletePost, getAllUsersPosts,
} from '../../firestore/DBFunctions';
// import errorHandling from '../errorHandling.js';
import { openCreateNewPostModal, editPost } from '../posts/posts.js';

export default () => {
  const user = auth.currentUser;
  console.log(user);
  // if (user !== null) {
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  //   const uid = user.uid;
  //   console.log(email);
  // }

  const container = document.createElement('div');
  container.classList.add('container-timeline');
  const header = createHeader();
  header.classList.add('header-site');
  container.append(header);

  const template = `
    <div class="form-wrapper-timeline">
      <p class="greeting">Olá,</p> 
          <div class="div-greeting-button">
            <p class="greeting-name">${user.displayName}</p>
            <img src="./assets/bt-new-post.png" id="btn-new-post" class="" alt="logo da ConectAda">
          </div>
          <div class="div-post-type">
            <p class="post-type">Últimos posts</p>
            <p class="post-type">Seus posts</p>
          </div>
          <section id="post-list" class="post-list">
          </section>
          <div id="modal-wrapper">
            <div id="modal-container">
            </div>
          </div>
        <div class="div-logout-btn"> 
          <button type="button" id="logout-button" class="button logout-btn" href="#login">Sair</button>
        </div>
      </div>    
  `;

  container.innerHTML += template;

  const logoutButton = container.querySelector('#logout-button');

  logoutButton.addEventListener('click', () => {
    LogOut(user);
    window.location.replace('#login');
  });

  const newPostButton = container.querySelector('#btn-new-post');
  newPostButton.addEventListener('click', openCreateNewPostModal);

  let allPosts = [];

  getAllUsersPosts()
    .then((allPostsAllUsers) => {
      allPosts = allPostsAllUsers;
      console.log(allPosts);
      showAllPosts(allPosts);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('Fim da solicitação de posts de todos os users.');
    });

  // getLoggedUserAllPosts()
  // .then((allLoggedUserPosts) => {
  //   allPosts = allLoggedUserPosts;
  //   showAllPosts(allPosts);
  // })
  // .catch((error) => {
  //   console.log(error);
  // })
  // .finally(() => {
  //   console.log('Fim da solicitação de posts.');
  // });

  // function showAllPosts() {
  //   if (loggedUserAllPosts) {
  //     const mappedPosts = loggedUserAllPosts.map((post) => post);
  //     const postsByDateOrderAsc = mappedPosts.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
  //     console.log(mappedPosts);
  //     const postsList = document.querySelector('#post-list');
  //     postsList.innerHTML = postsByDateOrderAsc.map((post) => `
  //       <article class="post-article">
  //         <div class="post-header">
  //           <div class="title">
  //             <h2>${post.title} </h2>
  //           </div>
  //           <p class="dateTime">${post.dateTime}</p>
  //         </div>

  //           <p class="post-body">${post.textPost}</p>

  //           <div class="div-action-buttons">
  //             <button type='button' id='edit-button-${post.id}' class='edit-button'>
  //               <span class="material-icons edit" alt='ícone de editar'>
  //             edit_note
  //               </span>
  //             </button>
  //             <button type='button' id='delete-button-${post.id}' class='delete-button'>
  //               <span class="material-icons delete" alt='ícone de lixeira'>
  //             delete_forever
  //               </span>
  //             </button>
  //           </div>
  //       </article>`).join('');

  //     const editButtons = postsList.querySelectorAll('.edit-button');
  //     editButtons.forEach((editButton) => {
  //       editButton.addEventListener('click', () => {
  //         const postId = editButton.id;
  //         const index = postId.split('-').pop();
  //         const post = postsByDateOrderAsc.find((postRef) => postRef.id === index);
  //         editPost(post);
  //       });
  //     });

  //     const deleteButtons = postsList.querySelectorAll('.delete-button');
  //     deleteButtons.forEach((deleteButton) => {
  //       deleteButton.addEventListener('click', () => {
  //         const postId = deleteButton.id;
  //         const index = postId.split('-').pop();
  //         console.log(index);
  //         // const post = postsByDateOrderAsc.find((postRef) => postRef.id === index);
  //         deletePost(index);
  //         location.reload();
  //       });
  //     });
  //   }
  // }

  function showAllPosts(posts) {
    if (posts) {
      const mappedPosts = posts.map((post) => post);
      const postsByDateOrderAsc = mappedPosts.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
      console.log(mappedPosts);
      const postsList = document.querySelector('#post-list');
      postsList.innerHTML = postsByDateOrderAsc.map((post) => `
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
            </div>
        </article>`).join('');

      const editButtons = postsList.querySelectorAll('.edit-button');
      const deleteButtons = postsList.querySelectorAll('.delete-button');
      postsByDateOrderAsc.forEach((post, index) => {
        if (post.uid === auth.currentUser.uid) {
          editButtons[index].classList.remove('none');
          deleteButtons[index].classList.remove('none');
          console.log(`Usuário autenticado é o autor do post ${post.uid}`);
        }
      });

      editButtons.forEach((editButton) => {
        editButton.addEventListener('click', () => {
          const postId = editButton.id;
          const index = postId.split('-').pop();
          const post = postsByDateOrderAsc.find((postRef) => postRef.id === index);
          editPost(post);
        });
      });

      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
          const postId = deleteButton.id;
          const index = postId.split('-').pop();
          console.log(index);
          // const post = postsByDateOrderAsc.find((postRef) => postRef.id === index);
          deletePost(index);
          location.reload();
        });
      });
    }
  }

  return container;
};
