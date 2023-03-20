// aqui exportaras las funciones que necesites
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import posts from '../feed/posts.js';

export default () => {
  const container = document.createElement('div');

  container.append(Header());

  const sectionMain = document.createElement('section');
  sectionMain.classList.add('section-main');

  const template = ` 
  <img class='girls-home' src='../../imagens/Women.svg' alt='Desenho-de-desenvolvedora'>
  <section class='display section-timeline' id='timeline-post' >
    
  </section>
  `;

  sectionMain.innerHTML += template;

  container.append(sectionMain);
  container.append(Footer());

  const timelinePost = container.querySelector('#timeline-post');
  posts(timelinePost);

  return container;
};
