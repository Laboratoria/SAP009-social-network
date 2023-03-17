export default () => {
  const container = document.createElement('div');

  const template = `
    <section class="container">
      <section class="imagem-logo">
          <img class="logo-escrita-clara" src="./img/logo-escrita-clara.png">;
      </section>>
      
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
            <button id="btnLogin" type="button" class="btn-login">Entrar</button>
          </div>
          <div>
            <button id="btnCadastrar" type="button" class="btn-cadastrar">Cadastrar</button>
          </div>
          <p class="entrar-google">Entrar com Google</p>
      </form>
    </section>
    `;

  container.innerHTML = template;
  return container;
};
