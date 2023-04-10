import { fazerLogin, fazerLoginComGoogle } from '../../firebase/firebase';

export default () => {
  const container = document.createElement('div');
  const template = `
    <section class='box-text-img'>
    <div class='box-01'>
    <img src='./img/logohelp8.png' alt='logo HelParents' class='img-logo'>
    <div class="paragrafo">
    <p>Compartilhe informações e orientações <br> sobre o uso da internet <br> e ajude pais e cuidadores.</p>
    <p><strong>Já está cadastrado? <br> Faça o login!</strong></p>
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
      <button type="submit" class="btn-feed" id="btn-feed">LOGIN</button>
      <p class='text-box-register'>Acesse com o Google<p>
      <div class='logo-google'>
      <img class='google-img' src='./img/googlelogo.png' alt='logo-google'>
      </div>
      <hr>
      <p class='text-box-register'>Ainda não tem conta?<p>
      <button type="submit" class="btn-cadastro" id="btn-cadastro">CADASTRE-SE</button>
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
  const btnCadastrar = container.querySelector('#btn-cadastro');
  btnCadastrar.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#cadastro';
  });

  const imgGoogle = container.querySelector('.google-img');
  imgGoogle.addEventListener('click', (event) => {
    fazerLoginComGoogle()
      .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      })
      .catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      }); 
  });

  const btnLogin = container.querySelector('#btn-feed');
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
        showErrorMessage('Login ou senha incorretos, tente outra vez', 4000);
      });
  });

  return container;
};
