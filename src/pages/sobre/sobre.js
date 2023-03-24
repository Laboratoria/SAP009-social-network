import { sair } from '../../firebase/firebase';

export default () => {
  const container = document.createElement('div');
  const template = `
        <div class="main">
            <div class="barra-feed">
                <i class="fa-solid fa-bars fa-2x icon-menu" id="burguer"></i>
                <menu id="itens">
                    <ul>
                        <li class="barra-itens"><a href="#feed">feed</a></li>
                        <li class="barra-itens"><a href="#">sobre</a></li>
                        <li class="barra-itens"><a id="btnSair" class="btn-sair"type="button">sair</a></li>
                    </ul>
                </menu>
                <div class="info-rede-social" id="info-rede-social">
                    <p>A Dog Tips é uma rede social para tutores de cães, criada para ajudá-los a compartilhar informações 
                    e dicas sobre cuidados com seus animais de estimação.</p>
                </div>
                <p class="txt-devs-desktop"id="txt-devs-desktop">As Desenvoldedoras e seus pets</p>
            </div>
            <div class="tela-principal-sobre">
                <div class="logo-tela-sobre">
                    <img src="./img/logo/logo.png" class="img-logo-sobre" id="img-logo-sobre" alt="logo-dogTips">
                </div>
                <p class="txt-devs">As Desenvoldedoras e seus pets</p>
            </div>
        </div>
        <div class="cards-devs" id="cards-devs">
            <div class="card-ana" id="card-ana">
                <div class="img-ana-tieta">
                    <img src="./img/devs/ana.png" class="img-ana" alt="Foto da desenvolvedora Ana">
                    <img src="./img/devs/tieta.png" class="img-tieta" alt="Foto da cadela Tieta">
                </div>
                <p class="tutora-ana">@Ana Paula Januário</p>
                <p class="cadela-tieta">@Tieta</p>
                <div class="img-sociais">
                    <a href="https://www.linkedin.com/in/ana-paula-413517259/" target="_blank"><img src="./img/icones-feed/linkedin.png" class="img-linkedin" alt="Logo do linkedin"></a>
                    <a href="https://github.com/paulajanu" target="_blank"><img src="./img/icones-feed/github.png" class="img-github" alt="Logo do github"></a>.
                </div>
            </div>
            <div class="card-paola" id="card-paola">
                <div class="img-paola-juca">
                    <img src="./img/devs/paola.png" class="img-paola" alt="Foto da desenvolvedora Paola">
                    <img src="./img/devs/juca.png" class="img-juca" alt="Foto do cachorro Juca">
                </div>
                <p class="tutora-paola">@Paola Oliveira</p>
                <p class="cachorro-juca">@Juca</p>
                <div class="img-sociais">
                    <a href="https://www.linkedin.com/in/paola-natalia-oliveira-440969150/" target="_blank"><img src="./img/icones-feed/linkedin.png" class="img-linkedin" alt="Logo do linkedin"></a>
                    <a href="https://github.com/paola-oliveira" target="_blank"><img src="./img/icones-feed/github.png" class="img-github" alt="Logo do github"></a>
                </div>
            </div>
            <div class="card-thai">
                <div class="img-thai-luigi">
                    <img src="./img/devs/thai.png" class="img-thai" alt="Foto da desenvolvedora Thai">
                    <img src="./img/devs/luigi.png" class="img-luigi" alt="Foto do cachorro Luigi">
                </div>
                <p class="tutora-thai">@Thainara Tabile</p>
                <p class="cachorro-luigi">@Luigi</p>
                <div class="img-sociais">
                    <a href="https://www.linkedin.com/in/thainaratabile/" target="_blank"><img src="./img/icones-feed/linkedin.png" class="img-linkedin" alt="Logo do linkedin"></a>
                    <a href="https://github.com/ThainaraTabile" target="_blank"><img src="./img/icones-feed/github.png" class="img-github" alt="Logo do github"></a>
                </div>
            </div>
        </div>
      `;
  container.innerHTML = template;

  const iconeMenu = container.querySelector('#burguer');
  iconeMenu.addEventListener('click', () => {
    const itens = container.querySelector('#itens');
    if (itens.style.display === 'block') {
      itens.style.display = 'none';
    } else {
      itens.style.display = 'block';
    }
  });

  const btnSair = container.querySelector('#btnSair');
  btnSair.addEventListener('click', () => {
    sair()
      .then(() => {
        window.location.hash = '#login';
      })
      .catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  });

  return container;
};
