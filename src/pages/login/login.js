import { valuesLogin, googleLogin } from '../../servicesFirebase/firebaseAuth';

export default () => {
  const container = document.createElement('div');

  const template = `
    <div class="body-login">
    <div class="coluna-1">  
        <picture class="imagem-login"></picture>
    </div>
    <div class="coluna-2">
      <section class="container">
        <section class="imagem-logo">
          <img class="logo-escrita-clara" src="./img/logo-escrita-clara.png">
        </section>

    <section class="fundo-form">
          <section class="texto-entrada">
            <p>A sua rede social para compartilhar dicas e receitas de dar água na boca</p>
            <h1>Seja bem - vindo</h1>
          </section>
            <form class="form-login">
              <div class="email-and-password-container">
               <div class="iconmail">
                  <input id="txtEmail" type="email" name="email" class="input-login" placeholder="Login" required <img class="mail" src="./img/icone-login.png">
               </div>
               <div class="iconmail">  
                  <input id="txtPassword" type="password" name="password" class="input-senha" placeholder="Password" minlength="8" required>
               </div>
              </div>
              <div>
              <span class="txt-error hide" id="txtError"></span>
              <button id="btnLogin" type="button" class="btn-login">Entrar</button>
              </div>
              <div>
              <a href="#cadastro"><button id="btnCadastrar" type="button" class="btn-cadastrar">Cadastrar</button></a>
              </div>
              <div class="action-google">
              <span class="erro-google hide" id="erro-google"></span>
              <p class="entrar-google">Entrar com Google</p>
              <button class="btn-google" id="btn-google">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"/>
              </button>
              </div>
            </form>
    </section>
      </section>
    </div>
  </div>  
    `;

  container.innerHTML = template;
  const email = container.querySelector('#txtEmail');
  const senha = container.querySelector('#txtPassword');
  const txtError = container.querySelector('#txtError');
  const btn = container.querySelector('#btnLogin');
  const btnGoogle = container.querySelector('#btn-google');
  const erroGoogle = container.querySelector('#erro-google');

  const fazerLogin = () => {
    console.log(email, senha);
    btn.addEventListener('click', (event) => {
      valuesLogin(email.value, senha.value)
        .then(() => {
          window.location.href = '#feed';
          console.log('Login com sucesso!!!');
        })
        .catch(() => {
          txtError.setAttribute('style', 'display: block');
          txtError.innerHTML = 'Usuário ou senha incorretos';
        });
    });
  };

  fazerLogin();

  btnGoogle.addEventListener('click', () => googleLogin()
    .then(() => { window.location.hash = '#feed';
    }));
  return container;
};
