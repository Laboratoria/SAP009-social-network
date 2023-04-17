export function postTemplate(post) {
  const postContainer = document.createElement('section');
  postContainer.classList.add('post-section');
  const template = `
  <div class="post-list">
   <hr> 
   <header class="header-post">
     <img src="user-icon.png" id="user-icon">
     <div class="username-post">${post.username}</div>
   </header>
   <p class="body-post">${post.post}</p>
   <footer>
     <div class="post-date">${post.date}</div>
     <div class="post-like">
      <button type="button" class="like-btn">
       <img src="heart-regular.png" id="not-liked">
       <img src="heart-solid.png" id="liked">
      </button>
      <div class="number-like">${post.likes}</div>
     </div>
   </footer>
  </div>
  `;
  postContainer.innerHTML = template;
  return postContainer;
}
