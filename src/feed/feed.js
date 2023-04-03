export default () => {
  const feedContainer = document.createElement("div");

  const feedScreen = `
    <section id='feed'>
    <section id='menu-pub'>
     <figure>
     <a href='#login'> <img src='imagens/logout.png' alt='Imagem publicação' id='image-publish'><p>SAIR</p> </a></figure>
      <img id='bumerangue-gif' src='imagens/bumerangue.gif'> 
      </section> 
      <section id='nav-pub'>
       <img src='imagens/perfil.png'><p> PERFIL </p>
        <img src='imagens/logo.png' id='feed-logo' alt='Logotipo QA- Qualidade de ações'>
        <a href='#publish'> <img src='imagens/publicar.png' alt='Imagem publicação' id='image-publish'> PUBLICAR </a>
        </section>
      <section id='new-pub'>
        <input placeholder='criar-publicação'></input>
        <input placeholder='minha-publicação'></input>
        <input type='button' value='outra-pubicação'></input>
        </section>
    
    </section>

    `;

  feedContainer.innerHTML = feedScreen;

  //COLOCAR AQUI OS AS MANIPULAÇÕES DINAMICAS DO DOM, PEGANDO OS IDS DO HTML E/OU CSS
  // COLOCAR OS EVENTOS DOS BOTOES DE ENTRAR, ENTRAR C/ GOOGLE E CADASTRAR
  // CRIAR AS CONDICIONAIS SE O EMAIL E/OU SENHA ESTIVEREM ERRADOS, OU SE O EMAIL JÁ FOR OU NÃO CADASTRADO, ETC...v

  return feedContainer;
};
