export function postTemplate(post) {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-section');
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
      <button type="button" class="like-btn">
       <img src="img/heart-regular.png" class="not-liked">
       <img src="img/heart-solid.png" class="liked">
      </button>
      <div class="number-like">${post.likes}</div>
     </div>
   </footer>
  </div>
  `;
  postContainer.innerHTML = template;

  return postContainer;
}
