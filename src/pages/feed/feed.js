import { addPost } from '../../firebase/config';

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
  <textarea name="digitar-post" id="text-area" cols="30" rows="10" placeholder="Qual seu produto queridinho? 
   Qual seu corte favorito?" ></textarea>
  <input type="button" value="Postar" id="post-button">
   </section>
  
      `;

  // const templateFeed = `
  //  <section id = "post-screen">
  //  </section>
  // `;
  containerFeed.innerHTML = feedScreen;
  const textArea = containerFeed.querySelector('#text-area');
  const buttonPost = containerFeed.querySelector('#post-button');

  buttonPost.addEventListener('click', () => {
    const date = new Date();
    const username = 'Michele';
    addPost(date, textArea.value, username);
  });
  return containerFeed;
};
