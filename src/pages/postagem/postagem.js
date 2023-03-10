const postagem = () => {
  const criarPostagem = document.createElement('div');
  const template = `
  <header class="header">
  <img src="imagens/logo-removebg-preview.png" alt="logo do site com desenho de dois cachos de uva envolvendo o nome mães e vinhos">
  <button class="btn-sair">Sair</button>
  </header>
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
  criarPostagem.innerHTML = template;
  return criarPostagem;
};

export default postagem;
