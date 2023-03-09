export default () => {
  const container = document.createElement('div');
  const template = `
        <div class="main">
            <div class="barra-feed">
                <i class="fa-solid fa-bars fa-2x icon-menu" id="burguer"></i>
                <menu id="itens">
                    <ul>
                        <li><a href="#">feed</a></li>
                        <li><a href="#">perfil</a></li>
                        <li><a href="#">sobre</a></li>
                        <li><a href="#">sair</a></li>
                    </ul>
                </menu>
                <h2>Seja bem-vindo(a)!</h2>
                <div class="perfil">
                    <div class="tutor">
                        <i class="fa-solid fa-circle-user fa-3x icon-usuário"></i>
                        <p class="texto-feed">@Tutor</p>
                    </div>
                    <div class="cao">
                        <i class="fa-solid fa-paw fa-3x icon-cão"></i>
                        <p class="texto-feed">@Cão</p>
                    </div>
                </div>
                <div class="tela-principal">
                    <div class="logo-tela">
                        <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
                    </div>
                    <div class="div-postagem-tutor">
                        <textarea class="texto-tutor" name="texto-tutor" cols="50" rows="4"></textarea>
                        <button class="btn-publicar">publicar</button>
                    </div>
                    <div class="div-postagem-anteriores-tutor">
                        <div id="icone-superiores">
                            <i class="fa-solid fa-circle-user fa-2x icon-usuario-txt"></i>
                            <p class="tutor-txt-area">@Tutor</p>
                            <p class="data-postagem">xx/xx/xxxx</p>
                        </div>
                        <textarea class="texto-tutor-postado" name="texto-tutor-postado" cols="50%" rows="4%"></textarea>
                        <div id="icones-inferiores">
                            <i class="fa-sharp fa-regular fa-heart icon-coracao"></i>
                            <i class="fa-sharp fa-solid fa-pencil"></i>
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>
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

  return container;
};
