// importar imgs de cada uma
import logoGithub from '../../../img/github.png';
import logoLinkedIn from '../../../img/linkedin.png';
import marina from '../../../img/marina.png';

export default () => {
  const aboutContainer = document.createElement('section');
  aboutContainer.classList.add('about-section');

  const aboutTemplate = `
  <div class="about-container">
    <div class="about-we">
        <h1>Who are we?</h1>
        <div class="devs">
            <img src="" class="dev-pic" alt="pic of Bruna Silveira">
            <h2 class="dev-name">Bruna Silveira</h2>
            <img src="${logoLinkedIn}" alt="LinkedIn icon" class="linkedin-logo"><a href="https://www.linkedin.com/in/brunakarlaandradesilveira/" class="dev-links">LinkedIn</a>
            <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/Bru-Silveira" class="dev-links">GitHub</a>
        </div>
        <div class="dev">
            <img src="${marina}" class="dev-pic" alt="pic of Marina Cezário">
            <h2 class="dev-name">Marina Cezário</h2>
            <img src="${logoLinkedIn}" alt="LinkedIn icon" class="linkedin-logo"><a href="https://www.linkedin.com/in/marina-cezario/" class="dev-links">LinkedIn</a>
            <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/marinacezario" class="dev-links">GitHub</a>
        </div>
        <div class="dev">
            <img src="" class="dev-pic" alt="pic of Silver Santos">
            <h2 class="dev-name">Silver Santos</h2>
            <img src="${logoLinkedIn}" alt="LinkedIn icon" class="linkedin-logo"><a href="https://www.linkedin.com/in/silver-santos/" class="dev-links">LinkedIn</a>
            <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/silversantos" class="dev-links">GitHub</a>
        </div>
    </div>
  </div>
  `;
  aboutContainer.innerHTML = aboutTemplate;

  return aboutContainer;
};
