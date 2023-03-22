import { observador, sair, fazerLogin } from '../../firebase/firebase';

const postagem = () => {
  const header = document.querySelector('.header');
  const criarPostagem = document.createElement('div');
  const template = `
    <div class="botao">
    <button class="btn-sair">Sair</button></div>

    <div class="postagem">
      <div class="mensagem-ola">
        <p class="paragrafo">Olá usúaria, seja bem-vinda! <br> O que você deseja compartilhar?</p>
      </div>
      
      <section class="novo-post">
        <textarea name="novo-texto" id="novo-texto" cols="30%" rows="4%"></textarea>
        <button class="btn-postar">Postar</button>
      </section>
      
      <span class="icones-inferiores">
        <i class="fa-sharp fa-regular fa-delete-left"></i>
        <i class="fa-sharp fa-solid fa-pen-to-square"></i>
      </span>
  </div>

  <div class="postagem-amigas">
    <div class="postagens-anteriores">
      <section class="postagem-data">
        <p class="data-postagem">xx/xx/xxxx</p>
      </section>
      <section class="ultimo-post">
        <div class="postagens-anteriores">
          <span class="perfil-usuaria">@nome</span>
          <i class="fa-solid fa-circle-heart"></i>
        </div>
      </section>
    </div>
  </div>
`;
  header.style.display = 'block';

  criarPostagem.innerHTML = template;

  const btnSair = criarPostagem.querySelector('.btn-sair');

  observador();

  btnSair.addEventListener('click', () => {
    sair();
    window.location.hash = fazerLogin();
  });

  return criarPostagem;
};

export default postagem;
