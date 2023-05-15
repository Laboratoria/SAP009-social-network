import { logOut } from '../../firebase/auth';
import { addPost, printPost } from '../../firebase/config';

export default () => {
  const containerFeed = document.createElement('div');

  const feedScreen = `
  <section id="imagens">
  <img src="imagens/connectCurls.png" width="50px" alt="logo-connect">
  <img src="imagens/web-content.png" width="30px" alt="feed">
  <img src="imagens/sair.png" width="30px" alt="sair" id="logOut">
  </section>
  <section id="postagem">
  <h1>O que você gostaria de compartilhar?</h1>
  <textarea name="digitar-post" id="text-area" cols="30" rows="10" placeholder="Qual seu produto queridinho? 
   Qual seu corte favorito?" ></textarea>
  <input type="button" value="Postar" id="post-button">
   </section>
  
   <section id = "post-screen">
   </section>
      `;

  const templateFeed = printPost();

  containerFeed.innerHTML = feedScreen;
  containerFeed.innerHTML = templateFeed;
  const textArea = containerFeed.querySelector('#text-area');
  const buttonPost = containerFeed.querySelector('#post-button');
  const imglogOut = containerFeed.querySelector('#logOut');
  // const printFeed = containerFeed.querySelector('#post-screen');

  buttonPost.addEventListener('click', () => {
    const date = new Date();
    const username = 'Michele';
    addPost(date, textArea.value, username);
  });

  imglogOut.addEventListener('click', () => {
    logOut()
      .then(() => {
        window.location.hash = '#login';
      });
  });

  return containerFeed;
};
