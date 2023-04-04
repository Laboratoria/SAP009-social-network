import {
  sairPerfil,
  auth,
} from '../../servicesFirebase/firebaseAuth';

export default () => {
  const container = document.createElement('div');

  const template = `     
  <div class="home-feed">
  <header>   
      <section class="container-feed">
          <div class="header">
              
                <a href="/#feed"><img class="logo-feed" src="./img/logo-sem-escrita.png"></a>
                <div class='feed display'>

                <p class='username' id='username' >Olá, ${auth.currentUser.displayName}</p>

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
                                  <a class='options-perfil' href="#">Perfil</a>
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
     
  <section class="post">
      <section class="botoes">
          <button id="btn-modal" class="btn-publicar">Criar Post</button>
      </section>
  </section>

  <dialog class="dialog" id="bloco">
  <div class="modal">
    <button id="fechar" class="fechar">X</button>
    <textarea class="input-post"></textarea>
    <button class="btn-postar">Publicar</button>
  </div>
  </dialog>

</div>
      `;

  container.innerHTML = template;
  const btnModal = container.querySelector('#btn-modal');
  const btnMenu = container.querySelector('.menu-toggle');
  const modal = container.querySelector('#bloco');
  const fecharModal = container.querySelector('#fechar');
  const menu = container.querySelector('.menu-section');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  const btnSair = container.querySelector('#btnSair');
  btnSair.addEventListener('click', () => sairPerfil()
    .then(() => {
      window.location.hash = '#login';
    }));

  btnModal.addEventListener('click', () => {
    modal.showModal();
  });
  fecharModal.addEventListener('click', () => {
    modal.close();
  });

  const user = auth.currentUser.displayName;
  if (user === '');

 return container;

};
