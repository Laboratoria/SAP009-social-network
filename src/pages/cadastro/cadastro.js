import { fazerCadastro } from '../../firebase/firebase';

export default () => {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('body-cadastro');
  const template = `
    <section class='box-text-img'>
    <div class='box-01'>
        <h1 class="logo-geral logo-register">HelParents</h1>
        <div class="paragrafo">
          <p><strong>Primeira vez por aqui?</strong></p>
          <p>Realize o seu cadastro, contribua e aproveite todas as possibilidades
          que esta rede pode oferecer!</p>
        </div>
      <div class='img-register'>
        <img src='./img/online.png' alt='img-cadastro' class='img-cadastro'>
      </div>
    </div>
    <section class='box-register'>
    <form class='section-register'>
      <h2 class='subtitle-register'>CADASTRAR</h2>
      <input type='text' placeholder='Nome Completo:' id='name'>
      <input type='text' placeholder='Nome de Usuário:' id='name-user'>
      <input type='email' placeholder='E-mail:' class='email'>
      <input type='password' placeholder='Senha:' class='password'> 
      <hr>
      <button class='btn-cadastro' id='cadastro type='button>CADASTRE-SE</button>
    </form>
    </section>
    </section>
    `;

  registerContainer.innerHTML = template;

  const btnCadastrar = registerContainer.querySelector('.btn-cadastro');
  btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    const nome = registerContainer.querySelector('.email');
    const senha = registerContainer.querySelector('.password');
    fazerCadastro(nome.value, senha.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });
  return registerContainer;
};
