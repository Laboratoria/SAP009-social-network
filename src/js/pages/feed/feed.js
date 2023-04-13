import { newPost } from '../../../firebase/firestore';

export default () => {
  const feedContainer = document.createElement('section');
  feedContainer.classList.add('feed-section');

  const feedTemplate = `
<div class="write-post">
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

  feedContainer.innerHTML = feedTemplate;

  // const postContainer = feedContainer.querySelector('.post-container');
  const textPost = feedContainer.querySelector('.text-area');
  const shareBtn = feedContainer.querySelector('.share-btn');

  shareBtn.addEventListener('click', async () => {
    await newPost(textPost.value);
    textPost.value = '';
  });

  return feedContainer;
};
