export default () => {
  const feedContainer = document.createElement('section');
  feedContainer.classList.add('feed-section');

  const feedTemplate = `
<div class="feed-main">
  <div class="feed-initial-text">  
    <h1>The best social media for learning English!</h1>
  </div>
</div>
`;

  feedContainer.innerHTML = feedTemplate;

  return feedContainer;
};
