export default () => {
  const container = document.createElement('div');
  container.classList.add('body-cadastro');
  const templaite = `
    
    <h1 class='cadastro'>cadastro</h1>
    <button class='btn-cadastro'>cadastrar</button>
    
  
    
    `;

  container.innerHTML = templaite;

  const btnCadastrar = container.querySelector('.btn-cadastro');
  btnCadastrar.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return container;
};
