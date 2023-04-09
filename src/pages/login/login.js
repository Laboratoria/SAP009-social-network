import { fazerLogin } from '../../firebase/firebase';

export default () => {
  const container = document.createElement('div');
  const template = `
    <section class='box-text-img'>
    <div class='box-01'>
    <h1 class="logo-geral logo-register">HelParents</h1>
    <div class="paragrafo">
    <p>A HelParents é uma rede social para você que é cuidador ou 
    responsável por alguma criança e/ou adolescente e busca 
    um espaço seguro para o compartilhamento de informações 
    e orientações  sobre o uso da internet e seus aplicativos por esse público.</p>
    <p><strong>Já está cadastrado? Faça o login!</strong></p>
    </div> 
    <div class='img-register'>
    <img src='./img/online.png' alt='img-cadastro' class='img-cadastro'>
    </div>
    </div>
    <section class='box-register'>
    <form class='section-register'>
      <h2 class='subtitle-register'>LOGIN</h2>
      <div> 
      <p class='msg-erro'><p> 
      </div>
      <input type='text' placeholder='E-mail:' id='name'>
      <input type='password' placeholder='Senha:' id='password'> 
      <div class="form-group">
      <button type="submit" class="btn-feed">LOGIN</button>
      <p class='text-box-register'>Acesse com o Google<p>
      <div class='logo-google'>
      <img src='./img/googlelogo.png' alt='logo-google'>
      </div>
      <hr>
      <p class='text-box-register'>Ainda não tem conta?<p>
      <button type="submit" class="btn-cadastro">CADASTRE-SE</button>
      </div>
    </form> 
    </section>
    </section>  
    `;

  const showErrorMessage = (message, timeout) => {
    const erroMsg = container.querySelector('.msg-erro');
    erroMsg.innerHTML = message;
    setTimeout(() => {
      erroMsg.innerHTML = '';
    }, timeout);
  };

  container.innerHTML = template;
  const btnLogin = container.querySelector('.btn-feed');
  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const nome = container.querySelector('#name');
    const senha = container.querySelector('#password');
    fazerLogin(nome.value, senha.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        const erroMsg = container.querySelector('.msg-erro');
        const errorCode = error.code;
        const errorMessage = error.message;
        showErrorMessage('Login ou senha incorretos, tente outra vez', 3000);
      });
  });

  const btnCadastrar = container.querySelector('.btn-cadastro');
  btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#cadastro';
  });

  return container;
};
