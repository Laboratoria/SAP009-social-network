import { newPost, snapshot, } from '../../../firebase/firestore';
import { getUsername } from '../../../firebase/firestore.js';

export default () => {
  const feedContainer = document.createElement('section');
  feedContainer.classList.add('feed-section');

  const feedTemplate = `
<div class="feed-container">
  <div class="write-post">
    <h2>Share your thoughts...</h2>
    <div class="user-post-area">
      <div class="display-username">Some User</div>
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
  <div class="post-container"></div>
  <div class="timeline"></div>
</div>
`;

  feedContainer.innerHTML = feedTemplate;

  // const postContainer = feedContainer.querySelector('.post-container');
  const textPost = feedContainer.querySelector('.text-area');
  const shareBtn = feedContainer.querySelector('.share-btn');
  const displayUsername = feedContainer.querySelector('.display-username');

  displayUsername.innerHTML = getUsername();

  shareBtn.addEventListener('click', async () => {
    await newPost(textPost.value);
    textPost.value = '';
  });


export function publish() {
    const publishContainer = document.createElement('div');
    publishContainer.classList.add('publish-container');
  
    const publishTemplate = `
<div class="publish">
    <h2>Share your thoughts...</h2>
    <div class="post-area">
      <div class="textarea-div">
        <textarea placeholder="What's up?" class="text-area" required></textarea>
      </div>
      <div class="share-btn-div">
        <button type="submit" class="share-btn">SHARE</button>
      </div>
    </div>
  </div>
  <div class="post-container"></div>
  <div class="timeline"></div>
  `;

  return feedContainer;
};

  const