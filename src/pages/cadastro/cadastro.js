export default () => {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('body-cadastro');
  const template = `
    <h1 class="logo-geral">HelParents</h1>
    <p><strong>Primeira vez por aqui?</strong></p>
    <p>Realize o seu cadastro, contribua e aproveite todas as possibilidades
    que esta rede pode oferecer!</p>
    <img src='./img/img_cadastro.png' alt='img-cadastro' class='img-cadastro'>
    <form class='section-register'>
      <h2>CADASTRAR</h2>
      <input type='text' placeholder='Nome Completo' id='name'>
      <input type='text' placeholder='Nome de Usuário' id='name-user'>
      <input type='email' placeholder='E-mail' id='e-mail'>
      <input type='password' placeholder='Senha' id='password'> 
      <button class='btn-cadastro' id='cadastro type='button>Cadastre-se</button>
    </form>
    `;

  registerContainer.innerHTML = template;

  const btnCadastrar = registerContainer.querySelector('.btn-cadastro');
  btnCadastrar.addEventListener('click', () => {
    window.location.hash = '#login';
  });
  return registerContainer;
};
