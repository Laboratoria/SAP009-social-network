import { fazerCadastro } from '../../firebase/firebase';

export default () => {
  const registerContainer = document.createElement('div');
  registerContainer.classList.add('body-cadastro');
  const template = `
    <section class='box-text-img'>
    <div class='box-01'>
    <img src='./img/novalogosemfundo.png' alt='logo HelParents' class='img-logo'>
        <div class="paragrafo">
          <p><strong>Primeira vez por aqui?</strong></p>
          <p>Realize o seu cadastro, contribua e <br> aproveite todas as possibilidades
          <br> que esta rede pode oferecer!</p>
        </div>
      <div class='img-register'>
        <img src='./img/op26.png' alt='img-cadastro' class='img-cadastro'>
      </div>
    </div>
    <section class='box-register'>
    <form class='section-register'>
      <h2 class='subtitle-register'>CADASTRO</h2>
      <input type='text' placeholder='Nome Completo:' id='name'>
      <input type='text' placeholder='Nome de Usuário:' id='name-user'>
      <input type='email' placeholder='E-mail:' class='email'>
      <input type='password' placeholder='Senha:' class='password'> 
      <hr>
      <button class='btn-cadastro' id='cadastro type='button>CADASTRAR</button>
    </form>
    </section>
    </section>
    `;

  registerContainer.innerHTML = template;

  const btnCadastrar = registerContainer.querySelector('.btn-cadastro');
  btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    const email = registerContainer.querySelector('.email');
    const senha = registerContainer.querySelector('.password');
    const nomeUsuario = registerContainer.querySelector('#name-user');

    fazerCadastro(email.value, senha.value, nomeUsuario.value)
      .then(() => {
        window.location.hash = '#feed';
      });
    /* .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      }); */
  });
  return registerContainer;
};
