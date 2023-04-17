import { newPost } from '../../../firebase/firestore';
import { getUsername } from '../../../firebase/firestore.js';

export default () => {
  const feedContainer = document.createElement('section');
  feedContainer.classList.add('feed-section');

  const feedTemplate = `
<div class="feed-container">
  <div class="write-post">
    <h2>Share your thoughts...</h2>
    <div class="user-post-area">
      <div class="display-username"></div>
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
  <div class="timeline"></div>
</div>
`;

  feedContainer.innerHTML = feedTemplate;
 
  const textPost = feedContainer.querySelector('.text-area');
  const shareBtn = feedContainer.querySelector('.share-btn');
  const displayUsername = feedContainer.querySelector('.display-username');

  displayUsername.innerHTML = getUsername();

  shareBtn.addEventListener('click', async () => {
    await newPost(textPost.value);
    textPost.value = '';
  });

  return feedContainer;
};
