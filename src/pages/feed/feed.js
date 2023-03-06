export default () => {
    const container = document.createElement("div")
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
            </div>
        </div>
    </div>
        `
    container.innerHTML = template;

    const iconeMenu = container.querySelector("#burguer")
                   iconeMenu.addEventListener('click', function() {
                    if(itens.style.display == 'block'){
                        itens.style.display = 'none';
                    }else{
                        itens.style.display = 'block' 
                    }
                });
                
                return container;
}