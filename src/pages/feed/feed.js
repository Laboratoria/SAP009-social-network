export default () => {
  const feedContainer = document.createElement('div');

  const feedScreen = `
    <section>
     <div id='menu'>
      <img src='assets/imagens/logo.png' id='feed-logo' alt='Logotipo QA- Qualidade de ações'>

      <img src='assets/imagens/perfil.png'><p> PERFIL </p>
      <a href='#publish'> <img src='assets/imagens/publicar.png' alt='Imagem publicação' id='image-publish'> PUBLICAR </a>
      <a href='#login'> <img src='assets/imagens/logout.png' alt='Imagem publicação' id='image-publish'> SAIR </a>
      <div>
    
      <img id='bumerangue-gif' src='assets/imagens/bumerangue.gif'>

      <input placeholder='criar-publicação'></input>
      <input placeholder='minha-publicação'></input>
      <input type='button' value='outra-pubicação'></input>
    
    </section>

    `;

  feedContainer.innerHTML = feedScreen;

  return feedContainer;
};
