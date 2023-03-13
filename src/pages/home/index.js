// aqui exportaras las funciones que necesites
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import { post } from '../feed/posts.js';

export default () => {
  const container = document.createElement('div');

  container.append(Header());

  const sectionMain = document.createElement('section');
  sectionMain.classList.add('section-main');

  const template = ` 
  <main class='display' >
    ${post}
  </main>
  `;

  sectionMain.innerHTML = template;

  container.append(sectionMain);
  container.append(Footer());
  return container;
};
