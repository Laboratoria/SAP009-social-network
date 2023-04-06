import logo from '../../images/logo.png';
import aline from '../../images/aline-perfil.png';
import bruna from '../../images/bruna-perfil.png';

export default () => {
  const containerAbout = document.createElement('div');

  const templateAbout = `
  <header>
  <img src="${logo}" id="logo-timeline" alt="Logo da Anime-se" />
  <span id="burger" class="material-symbols-outlined">menu</span>
  <nav id="menu">
    <a href="#timeline" id="timeline">Timeline</a>
    <a href="#login" id="logout">Sair</a>
  </nav>
</header>

<main class="black-bg">
  <h2 id="about-title">Sobre as desenvolvedoras</h2>

  <div class="box-info-about">
    <img src="${aline}" class="dev-image"/>
    <p class="dev-name">Aline Guiseline</p>
    <a href="https://www.linkedin.com/in/alineguiseline/" target="_blank">Linkedin</a>
    <span>|</span>
    <a href="https://github.com/AlineGuiseline" target="_blank">Github</a>
    <p class="dev-bio">
      Os animes sempre foram o meu refúgio e uma das minhas principais fontes de
      entretenimento. Eu os considero como muito além de simples passatempo, mas
      uma ferramenta poderosa de reflexão e conexão com as outras pessoas.
    </p>

    <details>
      <summary class="view-recomendation">Minhas recomendações</summary>
      <div class="box-recomendation">
        <ol class="recomendation">
          <li>
            Jojo's Bizarre Adventure: Simplesmente o meu anime favorito! Os
            personagens são muito bem trabalhados, as músicas são incríveis, o
            traço é único e a história é uma bizarrice danada, mas uma bizarrice
            maravilhosa ♥
          </li>
          <li>
            Blue Lock: Embora seja um anime de futebol e eu seja uma negação
            neste esporte (e em qualquer outro), Blue Lock vai muito além de
            garotos correndo atrás de uma bola e traz muitas reflexões sobre
            autoconhecimento e evolução pessoal.
          </li>
          <li>
            Yu Yu Hakusho: Um clássico absoluto que eu demorei 20 anos para
            assistir. Importante: assista dublado, porque a dublagem deixa o
            anime ainda melhor.
          </li>
          <li>
            Evangelion: Um anime mais denso, mas ainda indispensável,
            principalmente para os apaixonados por Psicologia e pelos mistérios
            da mente humana.
          </li>
          <li>
            Mirai Nikki: Apesar deste anime ter sido muito vendido pela
            violência e pela protagonista de sutiã extra G, a proposta é bem
            diferente e a evolução da trama, que só vai despencando ladeira
            abaixo, tornou-o um dos meus animes mais queridos.
          </li>
        </ol>
      </div>
    </details>
    <br>
  </div>
  <br>
  <div class="box-info-about">
    <img src="${bruna}" class="dev-image"/>
    <p class="dev-name">Bruna Abreu</p>
      <a href="https://www.linkedin.com/in/bru-abreu/" target="_blank">Linkedin</a>
      <span>|</span>
      <a href="https://github.com/bruna-abreu" target="_blank">Github</a>

    <p class="dev-bio">
      Apaixonada por cultura oriental desde criança, cresci assistindo animes e
      lendo mangás. Para mim os animes são fonte de entretenimento, alegria e
      conforto, e não consigo ver a minha vida sem eles.
    </p>

    <details>
      <summary class="view-recomendation">Minhas recomendações</summary>
      <div class="box-recomendation">
        <ol class="recomendation">
          <li>
            InuYasha: anime da minha infância, já assisti várias vezes e nunca
            perde a emoção. Para quem gosta de luta, comédia e ação é muito bom!
          </li>
          <li>
            Darker than Black: infelizmente pouco conhecido, é um anime para
            pessoas que gostam de algo com um toque mais sombrio...
          </li>
          <li>Claymore: mulheres poderosas e muita luta, amo demais!</li>
          <li>
            Ouran High School Host Club: uma comédia romântica muito fofa, não
            canso de ver!
          </li>
          <li>
            Magi The Labyrinth of Magic: pode parecer um pouco infantil no
            começo, mas não se engane, ele vai te surpreender!
          </li>
        </ol>
      </div>
    </details>
    <br>
  </div>
  <br>
</main>
  `;

  containerAbout.innerHTML = templateAbout;

  const menu = containerAbout.querySelector('#menu');
  const burger = containerAbout.querySelector('#burger');
  burger.addEventListener('click', () => {
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  });

  return containerAbout;
};
