import { newPost, getPost } from "../firebase/firebasestore.js";
import { auth } from "../firebase/auth.js";

export default () => {
  const container = document.createElement("div");
  container.classList.add("container-feed");

  const template = `
    <link rel="stylesheet" href="/pages/feed/feed.css">
    <aside class="menu hidden-when-mobile color-menu">
      <header class="header-menu">
        <img class="img-user" src="./image/logo_c&h.jpg" alt="logo Care&Health"/>
        <span>Fulano</span>
      </header>

      <nav>
        <button class="hidden-when-mobile">
          <span>
            <img src="./image/home.png" alt="icone de home" href="#" />
            <span>Home</span>
          </span>
        </button>

        <button class="hidden-when-mobile">
          <span>
            <img src="./image/publicar.png" src="ic_outline-add-circle-outline.png" alt="icone para publicar um post" href="#"/>
            <span>Publicar</span>
          </span>
        </button>

        <button class="hidden-when-mobile">
          <span>
            <img src="./image/sair.png" alt="icone para sair do app"/>
            <span>Sair</span>
          </span>
        </button>
      </nav>
    </aside>

  <!-- criando o menu hamburguer-->
    <button class="button-hamburguer">
      <img src="./image/menu-hamburguer.png" alt="ícone do menu"/>
    </button>

    <nav id="menu-mobile" class="menu-mobile">
      <button>
        <span class="img-close">
          <img src="./image/close.png" alt="ícone de X para fechar"/>
        </span>
      </button>

      <button>
        <span>
          <img src="./image/home.png" alt="icone de home" href="#" />
          <span class="text-mobile">Home</span>
        </span>
      </button>

      <button>
        <span>
          <img src="./image/publicar.png" src="ic_outline-add-circle-outline.png" alt="icone para publicar um post" href="#"/>            
          <span class="text-mobile">Publicar</span>
        </span>
      </button>

      <button>
        <span>
          <img src="./image/sair.png" alt="icone para sair do app"/>
          <span class="text-mobile">Sair</span>
        </span>
      </button>
    </nav>


     
  <main class="main">
      <section class="timeline">
        <section>
          <img class="logo-feed" src="./image/logo-titulo.png">
        </section>

        <form class="form-pots">
          <div class="post">
            <div class="post-text">
              <p class="username" id="username"></p>
              <textarea class="textarea" placeholder="Qual a sua dica/dúvida sobre pele ou cabelo?"></textarea>
            </div>
          
            <div class="post-button">
              <button type="button" id="button-publish" class="button-publish">Publicar</button>
            </div>
          </div>
        </form>
        <section id="post-container" class="post-container"></section>
      </section>
  </main>
  `;

  container.innerHTML = template;

  function toggleMenu() {
    const menuMobile = document.getElementById("menu-mobile");

    if (menuMobile.className === "menu-mobile-active") {
      menuMobile.className = "menu-mobile";
      menuMobile.setAttribute("src", "close.png");
      document.getElementsByClassName("button-hamburguer").display = "none";
      document.getElementsByClassName("img-close").display = "block";
    } else {
      menuMobile.className = "menu-mobile-active";
      menuMobile.setAttribute("src", "menu-hamburguer.png");
      document.getElementsByClassName("button-hamburguer").display = "block";
      document.getElementsByClassName("img-close").display = "none";
    }
  }

  function likePost() {
    const menuMobile = document.getElementById("like-heart");

    if (menuMobile.className === "like-heart-active") {
      menuMobile.className = "like-heart";
      menuMobile.setAttribute("src", "liked.png");
      document.getElementsByClassName("button-hamburguer").display = "none";
      document.getElementsByClassName("img-close").display = "block";
    } else {
      menuMobile.className = "menu-mobile-active";
      menuMobile.setAttribute("src", "menu-hamburguer.png");
      document.getElementsByClassName("button-hamburguer").display = "block";
      document.getElementsByClassName("img-close").display = "none";
    }
  }

  const menuOpen = container.querySelector(".button-hamburguer");
  menuOpen.addEventListener("click", toggleMenu);

  const menuClose = container.querySelector(".img-close");
  menuClose.addEventListener("click", toggleMenu);

  // pegar o post e armazenar no firabase
  const text = container.querySelector(".textarea");
  const buttonPublish = container.querySelector(".button-publish");
  buttonPublish.addEventListener("click", () => {
    if (text.value !== "") {
      const today = new Date();
      //const dataPostagem = today.toLocaleDateString();
      const username = auth.currentUser.displayName;
      const idUser = auth.currentUser.uid;
      newPost(text.value, today, username, idUser).then(() => {
        printPost();
      });
    } else {
      alert("Por favor, escreva algo para publicar!");
    }
  });
  //criar uma função para acessar os posts

  //responsável por criar

  const printPost = async () => {
    const arrayPost = await getPost();
    const template = arrayPost
      .map(
        (post) => `
    <section class="posts-users">

    <div class="text-and-likes">
      <div>
        <label class="name-post-user">${post.username}</label>
        <p>${post.date}</p>
      </div>
      <div>
        <p class="text-post-user">${post.text}</p>
      </div>  
      <div>
        <span class="like-post-user">
          <img class="like-heart" src="${post.like} "./image/liked-red.png" : "./image/like.png"
          }" alt="ícone de like com coração">
          <label id="likes-quantities">${post.like}</label>
        </span>
      </div>
    </div>
  </section>
    `
      )
      .join("");
    container.querySelector(".post-container").innerHTML = template;
  };
  printPost();
  return container;
};
