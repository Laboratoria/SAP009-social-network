import devKeila from '../../img/icones-sobre/devKeila.png';
import devStella from '../../img/icones-sobre/devStella.png';
import iconeGitHub from '../../img/icones-sobre/iconeGitHub.png';

export default () => {
  const container = document.createElement('div');
  const template = `
  <div>  
  <header>
  <section class="container-feed">
      <div class="header">
            <a href="/#feed"><img class="logo-feed" src="./img/logo-sem-escrita.png"></a>
            <div class='feed-display'>
            
            </div>
              <div class="menu-section">
              <button class="menu-toggle">
               <div class="one"></div>
               <div class="two"></div>
               <div class="three"></div>
              </button>
              <nav class="position-nav">
                  <div class="menu">
                      <ul class="ul-nav">
                          <li class="li-nav">
                              <a class='options-perfil' href="#sobre">Sobre</a>
                          </li>
                          <li class="li-nav">
                           <button id="btnSair" class='options-sair'>Sair</button>
                          </li>
                      </ul>
                  </div>
              </nav>
          </div>
      </div>
    </section>
</header>
        <section class='main-sobre'>
                <div>
                    <div class='description'>
                        <p class='texto-sobre'>A Brúlle é uma rede social criada para os amantes da Gastronomia se conectarem e compartilharem receitas, dicas de restaurantes e tudo que envolve o mundo gastronôminco.</p>
                    </div>
                    <p class='devs-sobre'>Desenvoldedoras da Brúlle</p>
                </div>
                <div class="cards-devs" id="cards-devs">
                    
                    <div class="card-keila" id="card-keila">
                        <div class="img-keila">
                            <img src="${devKeila}" class="img-keila" alt="Foto da desenvolvedora Keila">
                        </div>
                        <div class="img-sociais">
                        <a href="https://www.linkedin.com/in/keilaoliveiradev/">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" class="img-linkedin" alt="Logo do linkedin"></a>
                        <a href="https://github.com/Keilaoliveira0112"><img src="${iconeGitHub}" class="img-github" alt="Logo do github"></a>.
                        </div>
                    </div>
                    <div class="card-stella" id="card-stella">
                        <div class="img-stella">
                            <img src="${devStella}" class="img-stella" alt="Foto da desenvolvedora Stella">
                        </div>
                        <div class="img-sociais">
                        <a href="https://www.linkedin.com/in/stella-zen/">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" class="img-linkedin" alt="Logo do linkedin"></a>
                        <a href="https://github.com/Stellazen"><img src="${iconeGitHub}" class="img-github" alt="Logo do github"></a>.
                        </div>  
                    </div>    
                </div>
        </section>  
  </div>  
  `;
  container.innerHTML = template;
  return container;
};
