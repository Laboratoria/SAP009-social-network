export default () => {
  const footerContainer = document.createElement('footer');
  const footerTemplate = `
<div id="div-footer">
  <h1>Desenvolvido por:</h1>
  <div class="git-name">
    <img src="/img/github.svg" alt="cat icon" class="github-cat"><a href="https://github.com/Bru-Silveira" class="footer-names">Bruna Silveira</a></img>
  </div>
  <div class="git-name">
    <img src="/img/github.svg" alt="cat icon" class="github-cat"><a href="https://github.com/marinacezario" class="footer-names">Marina Cezário</a></img>
  </div>
  <div class="git-name">
    <img src="/img/github.svg" alt="cat icon" class="github-cat"><a href="https://github.com/silvertapecoder" class="footer-names">Silver Santos</a></img>
  </div>
</div>
  `;

  footerContainer.innerHTML = footerTemplate;

  return footerContainer;
};
