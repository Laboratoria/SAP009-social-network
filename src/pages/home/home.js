import { listarPosts } from '../../lib/api';

export default () => {
  const container = document.createElement('div');
  const template = ` 
  <header>  
    <div class="containerHome">
      <nav>
        <div class="icones">
          <i class="fa-solid fa-house"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-plus"></i>
        </div>
      </nav>
    </div>
  </header>
    <section id="bordaCadastroHome">
    <img id="logoTexto" src="imagens/logo1.png.png">
    <img id="usuarioGato" src="imagens/usuarioGato.png">
    <p id="nomeUsuario">Nome do Usuário</p>
    <textArea id="areaTexto" rows = "15" cols = "15" name="textoPostagem">Compartilhe com seus amigos como você está se sentindo hoje!
    </textArea> 

    <button id='posts'>Posts</button>
    </section>  
  `;
  container.innerHTML = template;
  const btnPost = container.querySelector('#posts');
  btnPost.addEventListener('click', (e) => {
    e.preventDefault();
    listarPosts();
    function postar() {

    }
  });
  //  getAuth user
  return container;
};
