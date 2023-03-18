import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import { newPost } from '../../servicesFirebase/firebaseStore.js';
import { Auth } from '../../servicesFirebase/firebaseAuth';
// import { nameUser } from '../../servicesFirebase/firebaseAuth.js';

export default () => {
  const container = document.createElement('div');
  container.append(Header());

  const sectionMain = document.createElement('section');
  sectionMain.classList.add('section-main');

  const template = ` 
  <main class='display' >
  <div class='feed display'>
    <p class='username' id='username' >${Auth.currentUser.displayName}</p>
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
    alert('Publicação efetuada com sucesso!');
    const text = container.querySelector('.textarea');
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dataPostagem = today.toLocaleDateString();
    const username = Auth.currentUser.displayName;
    const idUser = Auth.currentUser.uid;
    newPost(text.value, dataPostagem, username, idUser);
    try {
      window.location.hash = '#Home';
    } catch (e) {
      // console.log(e);
    }
  });
  return container;
};
