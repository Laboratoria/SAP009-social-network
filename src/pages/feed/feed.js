export default () => {
  const container = document.createElement('div');

  const template = `     
    <div class="home-feed">
        <header>   
            <section class="container-feed">
                <div class="header">
                    <a href="/#feed"><img class="logo-feed" src="./img/logo-sem-escrita.png"></a>
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
                                    <a class='options-menu' href="#">Sobre nós</a>           
                                </li>
                                <li class="li-nav">
                                    <a class='options-menu' href="#">Perfil</a>
                                </li>
                                <li class="li-nav">
                                    <a class='options-menu' href="#">Sair</a>
                                </li>
                            </ul>
                        </div>
                </div>        
                    </nav>
                </div> 
                
            </section>
        </header>
           
    <section class="post">
        <form class="form">
        <textarea class="input-post"></textarea>
        </form>
        <section class="botoes">
            <button class="btn-imagem">Imagem</button>
            <button class="btn-publicar">Publicar</button>
        </section>
    </section>
    </div>
      `;

  container.innerHTML = template;
  const btnMenu = container.querySelector('.menu-toggle');
  const menu = container.querySelector('.menu-section');

  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  return container;
};
