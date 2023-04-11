export default () => {
  const container = document.createElement("div");
  container.classList.add("container-feed");

  const template = `
  <header class="header-menu">
          <img src="./image/logo_c&h.jpg" alt="logo Care&Health"/>
  </header>
  

          <img src="./image/home.png" alt="icone de home" href="#" />
          <img src="./image/publicar.png" src="ic_outline-add-circle-outline.png" alt="icone para publicar um post" href="#"/>
          <img src="./image/sair.png" alt="icone para sair do app" />
        </div>
  
      <div class="user"
        <span>Nome_do_Usuário</span>
      </div>
  <form class="form-pots">
    <div class="post">
      <div class="text">
        <p class="username" id="username"></p>
        <textarea class="textarea" placeholder="Qual a sua dica/dúvida sobre pele ou cabelo?"></textarea>
      </div>
      <div class="post-button">
        <button type="button" id="button-publish" class="button-publish">Publicar</button>
      </div>
    </div>
  </form
    `;

  container.innerHTML = template;

  return container;
};
