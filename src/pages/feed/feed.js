import { fazerLogout } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <h2>aqui vão as postagens</h2>
  <button type="button" class="botao-sair">Sair</button>
  `;

  container.innerHTML = template;

  const botaoSair = container.querySelector('.botao-sair');
  botaoSair.addEventListener('click', () => {
    fazerLogout()
      .then(() => {
        window.location.hash = '#login';
      })
      .catch(() => {
        alert('Obrigada por visitar a Lemos!');
      });
  });

  return container;
};