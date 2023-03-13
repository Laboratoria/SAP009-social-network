import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import { newPost } from '../../servicesFirebase/firebaseStore.js';

export default () => {
  const container = document.createElement('div');

  container.append(Header());

  const sectionMain = document.createElement('section');
  sectionMain.classList.add('section-main');

  const template = ` 
  <main class='display' >
  <div class='feed display'>
    <p class='username' id='username' >Username</p>
    <textarea class='textarea' placeholder='Digite aqui a sua mensagem'></textarea>
    <div class='icons display'>
      <button type='button' id='botao-postar' class='botao-postar'>Postar</button>
    </div>
  </div>   
  </main>
  `;
  sectionMain.innerHTML = template;

  container.append(sectionMain);
  container.append(Footer());

  const buttomPost = container.querySelector('#botao-postar');
  buttomPost.addEventListener('click', () => {
    const text = container.querySelector('.textarea');
    // const username = container.querySelector('.username');
    newPost(text.value); // colocar data da postagem
  });
  return container;
};
