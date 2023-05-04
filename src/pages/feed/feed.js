export default () => {
  const containerFeed = document.createElement('div');

  const feedScreen = `
  <section id="imagens">
  <img src="imagens/connectCurls.png" width="50px" alt="logo-connect">
  <img src="imagens/web-content.png" width="30px" alt="feed">
  <img src="imagens/sair.png" width="30px" alt="sair">
  </section>
  <section id="postagem">
  <h1>O que você gostaria de compartilhar?</h1>
  <input type="text" placeholder="Qual seu produto queridinho? Qual seu corte favorito?">
  <input type="button" value="Postar" id="post-button">
   </section>
  
      `;
  containerFeed.innerHTML = feedScreen;
  return containerFeed;
};
