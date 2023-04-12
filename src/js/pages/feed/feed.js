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
<div class="latest-posts">
  <hr>
</div>
`;

  feedContainer.innerHTML = feedTemplate;

  return feedContainer;
};
