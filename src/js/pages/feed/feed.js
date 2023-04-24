import {
  newPost,
  getUserData,
  findPosts,
} from '../../../firebase/firestore.js';

import { postTemplate } from './posts.js';

import userIcon from '../../../img/user-icon.png';

export default () => {
  const feedContainer = document.createElement('section');
  feedContainer.classList.add('feed-section');

  const feedTemplate = `
<div class="feed-container">
  <div class="write-post">
    <h2>Share your thoughts...</h2>
    <div class="user-post-area">
    <div class="user-area">  
      <img src="${userIcon}" class="user-icon">
      <div class="display-username"></div>
    </div>
      <div class="post-area">
        <div class="textarea-div">
          <textarea placeholder="What's up?" class="text-area" required></textarea>
        </div>
        <div class="share-btn-div">
          <button type="submit" class="share-btn">SHARE</button>
        </div>
      </div>
    </div>
  </div>
  <div class="post-container" id="timeline"></div>
</div>
`;

  feedContainer.innerHTML = feedTemplate;

  const textPost = feedContainer.querySelector('.text-area');
  const shareBtn = feedContainer.querySelector('.share-btn');
  const displayUsername = feedContainer.querySelector('.display-username');
  const timeline = feedContainer.querySelector('#timeline');

  displayUsername.innerHTML = getUserData().displayName;
  const showPosts = (posts) => {
    timeline.innerHTML = '';
    posts.forEach((post) => {
      timeline.appendChild(postTemplate(post));
    });
  };

  findPosts(showPosts);
  shareBtn.addEventListener('click', async () => {
    if (textPost.value.length > 0) {
      await newPost(textPost.value);
      /*       postRef = await readOnePost(postRef.id); */
      /*       publishedPost.appendChild(timelinePosts(postRef)); */
      textPost.innerHTML = '';
    }
    textPost.value = '';
  });
  return feedContainer;
};
