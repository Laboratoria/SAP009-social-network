export default () => {
  const container = document.createElement('div');
  const template = `
     
  
    `;

  container.innerHTML = template;
  const btnSair = container.querySelector('.btn-sair');
  btnSair.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return container;
};
