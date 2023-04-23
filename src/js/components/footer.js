import logoGithub from '../../img/github.png';

export default () => {
  const footerContainer = document.createElement('footer');
  const footerTemplate = `
<div id="div-footer">
  <h1>Desenvolvido por:</h1>
  <div class="git-name">
    <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/Bru-Silveira" class="footer-names">Bruna Silveira</a>
  </div>
  <div class="git-name">
    <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/marinacezario" class="footer-names">Marina Cezário</a>
  </div>
  <div class="git-name">
    <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/silversantos" class="footer-names">Silver Santos</a><
  </div>
</div>
  `;

  footerContainer.innerHTML = footerTemplate;

  return footerContainer;
};
