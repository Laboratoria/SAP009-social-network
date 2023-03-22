import { fazerLogin, loginComGoogle, observador } from '../../firebase/firebase';
import postagem from '../postagem/postagem';

const criarLogin = document.createElement('section');

const login = () => {
  const template = `
    <div class="caixa-login">
      <form class="form-login">
        <input id="login-email" type="email"  placeholder="E-mail" required/>

        <input id="login-senha" type="password" id="password" placeholder="Senha" required/>

        <input class="btn-entrar " type="submit" value="Entrar">
      </form>

    <section class="login-com">
      <p class="login-google">Login com</p>

      <button class="btn-google" type="button">
        <img src="./imagens/icone google.png" alt="icone google">
      </button>

      <p>Ainda não possui cadastro? <br> <a href="/#cadastro">Crie sua conta!</a></p>
    </section>
  </div> 
`;

  criarLogin.innerHTML = template;

  const form = criarLogin.querySelector('.form-login');
  const loginEmail = criarLogin.querySelector('#login-email');
  const loginSenha = criarLogin.querySelector('#login-senha');
  const btnEntrar = criarLogin.querySelector('.btn-entrar');
  const btnGoogle = criarLogin.querySelector('.btn-google');

  observador();

  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();

    if (loginEmail.value === '' || loginSenha.value === '') {
      form.reportValidity();
      console.log('preencha');
    } else {
      fazerLogin(loginEmail.value, loginSenha.value); // usar then e catch
      console.log('funciona');
      // window.location.hash = postagem(); // não tá indo
    }
  });

  btnGoogle.addEventListener('click', () => {
    loginComGoogle();
  });

  return criarLogin;
};

export default login;
