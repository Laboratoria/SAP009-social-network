export default () => {
  const feedContainer = document.createElement("div");
  ////<p class="gaparecer nome do usuario pego no login">${user.displayName}</p>//
  const feedScreen = `
    <section id='feed'>
    <section id='menu-pub'>
    <p class="hello">Olá,</p> 
     <figure><img src='imagens/logout.png' alt='Imagem publicação' id='image-publish'></figure>
        <img id='bumerangue-gif' src='imagens/bumerangue.gif'> 
      </section>      
      <section id='nav-pub'>
       <img id='profile' src='imagens/perfil.png'>
        <img id='logo' src='imagens/logo.png' id='feed-logo' alt='Logotipo QA- Qualidade de ações'>
        <a href='#publish'> <img id='publish' src='imagens/publicar.png' alt='Imagem publicação' id='image-publish'> </a>
        </section>
        <section>
        <footer> <strong> © BOOMERANG </strong> </footer>
        </section>
        
    </section>
    `;

  feedContainer.innerHTML = feedScreen;

  //COLOCAR AQUI OS AS MANIPULAÇÕES DINAMICAS DO DOM, PEGANDO OS IDS DO HTML E/OU CSS
  // COLOCAR OS EVENTOS DOS BOTOES DE ENTRAR, ENTRAR C/ GOOGLE E CADASTRAR
  // CRIAR AS CONDICIONAIS SE O EMAIL E/OU SENHA ESTIVEREM ERRADOS, OU SE O EMAIL JÁ FOR OU NÃO CADASTRADO, ETC...v

  return feedContainer;
};
