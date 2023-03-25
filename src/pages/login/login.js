import { valuesLogin} from '../../servicesFirebase/firebaseAuth'
export default () => {
  const container = document.createElement('div');

  const template = `
    <div class="body-login">
    <div class="coluna-1">  
        <img class="imagem-login" src="./img/imagem-login.jpg"/>
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
                <div class="icone"></div>
                  <input id="txtEmail" type="email" name="email" class="input-login" placeholder="Login" required <img class="mail" src="./img/icone-login.png">
               </div>
      
               <div class="iconmail">
                  <div class="icone"></div>
                  <input id="txtPassword" type="password" name="password" class="input-senha" placeholder="Password" minlength="8" required>
               </div>
              </div>
              <div>
              <a href="/#feed"><button id="btnLogin" type="button" class="btn-login">Entrar</a></button>
              </div>
              <div>
              <a href="/#cadastro"><button id="btnCadastrar" type="button" class="btn-cadastrar">Cadastrar</button>
              </div>
              <p class="entrar-google">Entrar com Google</p>
            </form>
    </section>
      </section>
    </div>
  </div>   
    `;

  container.innerHTML = template;
  const fazerLogin = () => {
    const email = container.querySelector('#txtEmail').value;
    const senha = container.querySelector('#txtPassword').value;
    valuesLogin(email, senha);
    console.log(email, senha);
    container.addEventListener('click', function (event) {
    if (event.target.id === 'btnLogin' && event.target.nodeName == 'BUTTON') fazerLogin()
});
  };
  fazerLogin();
  return container;
};
