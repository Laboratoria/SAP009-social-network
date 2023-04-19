/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
import { fazerLogin, loginComGoogle } from '../../firebase/firebase-auth';
import { exibeErros } from '../../firebase/funcoes-acessorias';

const criarLogin = document.createElement('div');
criarLogin.className += 'pagina-login';

const login = () => {
  const template = `
  <div class="container-bcg-login">   
    <div class="bckgnd-txt-img">
      <img class="img-apresentacao" src="./imagens/background login.png" alt="dois cachos de uva diagonalmente opostos com o nome mães e vinhos entre ele">

      <h3 class="texto-apresentacao">Seja bem-vinda! Mães e vinhos é uma rede social feita para mães que gostam de conversar sobre maternidade real acompanhadas de uma boa taça de vinho. Por aqui a emoção é a flor da pele, com lágrimas e risos garantidos. Esse é um espaço de conexão e partilha. <br> Junte-se a nós!</h3>
    </div>

    <div class="caixa-login">
      <p class="erro-login"></p>

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
  </div>

  <div class="footer-login-desktop">
    <img class="imagem-footer-login " src="../imagens/brinde_taças-removebg-preview.png" alt="duas mãos próximas segurando taças com vinho simulando um brinde">
  </div>
  `;

  criarLogin.innerHTML = template;

  const erroLogin = criarLogin.querySelector('.erro-login');
  const form = criarLogin.querySelector('.form-login');
  const loginEmail = criarLogin.querySelector('#login-email');
  const loginSenha = criarLogin.querySelector('#login-senha');
  const btnEntrar = criarLogin.querySelector('.btn-entrar');
  const btnGoogle = criarLogin.querySelector('.btn-google');

  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();

    // validação de preenchimento do form

    if (loginEmail.value === '' || loginSenha.value === '') {
      form.reportValidity();
    } else {
      // validação das informações para realizar login

      fazerLogin(loginEmail.value, loginSenha.value)
      .then(() => {
        window.location.hash = '#postagem';
      }).catch((error) => {
        erroLogin.innerHTML = exibeErros(error);
      });
    }
  });

  // login com google
  btnGoogle.addEventListener('click', () => {
    loginComGoogle()
    .then(() => {
      window.location.hash = '#postagem';
    }).catch((error) => {
      console.log(error);
      window.location.hash = '#';
      console.log('não foi possivel concluir o login');
    });
  });

  return criarLogin;
};

export default login;
