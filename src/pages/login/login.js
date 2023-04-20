import {
  fazerLogin,
  loginComGoogle,
} from '../../firebase/firebase';
import {
  exibeErros,
} from '../../firebase/funcoes-acessorias';

import imagemDesktop from '../../imagens/img-desktop.png';
import logoLogin from '../../imagens/logomeve.png';

const criarLogin = document.createElement('div');
criarLogin.classList.add('container-login'); // adiciona classe à div.

const login = () => {
  const template = `
    <div class="header">
      <header>
        <p class="paragrafo-login"> Bem-vindas a "MEV"! <br> Junte-se a nós e faça parte dessa comunidade onde mães podem relaxar, brindar à vida e celebrar a jornada da maternidade com uma taça de vinho na mão. 
        </p>
        <p class="crie-conta"><a href="/#cadastro">Crie sua conta!</a></p>
        <img class="logo"src='${logoLogin}' alt="go do site com desenho de uma mancha de vinho em formato de copo e o nome mães e vinhos">
      </header>
    </div> 
            
     
    <div class='caixa-login'>
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
      </section>
      <div class='img-desktop-login'> 
        <img src="${imagemDesktop}" class="img-desktop-login" alt="Ilustração login"
      </div> 
    </div> 
      <footer class="footer">
        <p>Desenvolvido por <a href="https://github.com/VieiraAriane">Ariane Vieira</a>, 2023.</>
      </footer>
  `;

  criarLogin.innerHTML = template;

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
      fazerLogin(loginEmail.value, loginSenha.value)
        .then(() => {
          window.location.hash = '#postagem';
        }).catch((error) => {
          (exibeErros(error));
        });
    }
  });

  // login com google

  btnGoogle.addEventListener('click', () => {
    loginComGoogle()
      .then(() => {
        window.location.hash = '#postagem';
      }).catch((error) => {
        exibeErros(error);
        window.location.hash = '#';
        alert('não foi possivel concluir o login');
      });
  });

  return criarLogin;
};

export default login;
