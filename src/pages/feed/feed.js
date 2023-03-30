export default () => {
  const container = document.createElement('div');
  const template = `
    <h1 class='feed'>feed</h1>
    <button class='btn-sair'>sair</button>
    
    
    
    `;

  container.innerHTML = template;
  const btnSair = container.querySelector('.btn-sair');
  btnSair.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return container;
};
