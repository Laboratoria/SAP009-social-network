// importar imgs de cada uma
import logoGithub from '../../../img/github.png';
import logoLinkedIn from '../../../img/linkedin.png';
import bruna from '../../../img/bruna.png';
import marina from '../../../img/marina.png';
import silver from '../../../img/silver.png';

export default () => {
  const aboutContainer = document.createElement('section');
  aboutContainer.classList.add('about-section');

  const aboutTemplate = `
  <div class="about-container">
    <div class="about-we">
        <h1>Who are we?</h1>
        <div class="dev">
            <img src="${bruna}" class="dev-pic" alt="pic of Bruna Silveira">
            <h2 class="dev-name">Bruna Silveira</h2>
            <p class="dev-bio">Com o sonho de fazer intercâmbio, Bruna sempre buscou aprimorar 
            o inglês e, quando surgiu a oportunidade de morar em Malta e na Inglaterra entre 
            2017 e 2018, agarrou a chance sem hesitar. Embarcou no projeto S2S com o objetivo 
            de retomar o interesse que tem pelo idioma.</p>
          <div class="logo-link">
            <img src="${logoLinkedIn}" alt="LinkedIn icon" class="linkedin-logo"><a href="https://www.linkedin.com/in/brunakarlaandradesilveira/" class="dev-links">LinkedIn</a>
            <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/Bru-Silveira" class="dev-links">GitHub</a>
          </div>
        </div>
        <div class="dev">
            <img src="${marina}" class="dev-pic" alt="pic of Marina Cezário">
            <h2 class="dev-name">Marina Cezário</h2>
            <p class="dev-bio">Estudando Inglês desde criança, Marina sempre teve contato 
            com o idioma. Foi Au Pair entre 2011 e 2012, e, quando retornou ao Brasil, teve 
            a oportunidade de atuar como professora de Inglês. Acredita no acesso do Inglês 
            para todos e que o S2S pode ajudar a proporcionar essa realidade.</p>
          <div class="logo-link">
            <img src="${logoLinkedIn}" alt="LinkedIn icon" class="linkedin-logo"><a href="https://www.linkedin.com/in/marina-cezario/" class="dev-links">LinkedIn</a>
            <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/marinacezario" class="dev-links">GitHub</a>
          </div>
        </div>
        <div class="dev">
            <img src="${silver}" class="dev-pic" alt="pic of Silver Santos">
            <h2 class="dev-name">Silver Santos</h2>
            <p class="dev-bio"> Silver é autodidata. Começou a aprender inglês com 12 anos 
            por meio da música e foi aprimorando o idioma usando as redes sociais em 
            interações com outros usuários. Hoje é professora de Inglês e deseja que o S2S 
            possa trazer a mesma oportunidade para outras pessoas interessadas no idioma.</p>
            </p>
          <div class="logo-link">
            <img src="${logoLinkedIn}" alt="LinkedIn icon" class="linkedin-logo"><a href="https://www.linkedin.com/in/silver-santos/" class="dev-links">LinkedIn</a>
            <img src="${logoGithub}" alt="cat icon" class="github-cat"><a href="https://github.com/silversantos" class="dev-links">GitHub</a>
          </div>
        </div>
    </div>
  </div>
  `;
  aboutContainer.innerHTML = aboutTemplate;

  return aboutContainer;
};
