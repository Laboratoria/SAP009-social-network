import devKeila from '../../img/icones-sobre/devKeila.png';
import devStella from '../';
import iconeLinkedin from '../../img/icones-sobre/iconeLinkedin.png';
import iconeGitHub from '../../img/icones-sobre/iconeGitHub.png';

export default () => {
  const container = document.createElement('div');
  const template = `
  <div>  
  <header>
        <section>
          <div>
                <div>
                    <div>
                        <p>A Brúlle é uma rede social criada para os amantes da Gastronomia se conectarem e compartilharem receitas, dicas de restaurantes e tudo que envolve o mundo gastronôminco.</p>
                    </div>
                    <p>Desenvoldedoras da Brúlle</p>
                </div>
                <divclass="cards-devs" id="cards-devs">
                    
                    <div class="card-keila" id="card-keila">
                        <div class="img-keila">
                            <img src="${devKeila}" class="img-keila" alt="Foto da desenvolvedora Keila">
                        </div>
                    </div>    
                    <div class="img-sociais">
                        <a href="https://www.linkedin.com/in/keilaoliveiradev/"><img src="${iconeLinkedin}" class="img-linkedin" alt="Logo do linkedin"></a>
                        <a href="https://github.com/Keilaoliveira0112"><img src="${iconeGitHub}" class="img-github" alt="Logo do github"></a>.
                    </div>
                  
                    <div class="card-stella" id="card-stella">
                        <div class="img-stella">
                            <img src="${devStella}" class="img-stella" alt="Foto da desenvolvedora Stella">
                        </div>
                    </div>  
                    <div class="img-sociais">
                        <a href="https://www.linkedin.com/in/stella-zen/"><img src="${iconeLinkedin}" class="img-linkedin" alt="Logo do linkedin"></a>
                        <a href="https://github.com/Stellazen"><img src="${iconeGitHub}" class="img-github" alt="Logo do github"></a>.
                    </div>      
                </div>
            </div>
        </sectio>  
  </header>
  </div>  
  `;
  container.innerHTML = template;
  return container;
};
