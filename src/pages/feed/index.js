export default () => {
  const container = document.createElement("div");
  container.classList.add("container-feed");

  const template = `
    <aside>
      <header class="header-menu">
        <img src="./image/logo_c&h.jpg" alt="logo Care&Health"/>
      </header>

      <nav>
        <button>
          <span>
            <i>
              <img src="./image/home.png" alt="icone de home" href="#" />
            </i>
            <span></span>
          </span>
        </button>

        <button>
          <span>
            <i>
              <img src="./image/publicar.png" src="ic_outline-add-circle-outline.png" alt="icone para publicar um post" href="#"/>
            </i>
            <span></span>
          </span>
        </button>

        <button>
          <span>
            <i>
              <img src="./image/sair.png" alt="icone para sair do app"/>
            </i>
            <span></span>
          </span>
        </button>
      </nav>
    </aside>
          

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
  <aside>
    `;

  container.innerHTML = template;

  return container;
};
