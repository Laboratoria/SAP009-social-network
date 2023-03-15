export default () => {
  const container = document.createElement('div');

  const template = `
    <section class="container-login">   
        <img class="logo-escrita-clara" src="./img/logo-escrita-clara.png">;
    </section>
    
    <section>
        <h1>Seja bem - vindos</h1>
    </section>

    <form class="form-login">
        <div class="email-and-password-container">
         <div class="iconmail"> 
          <img class="mail" src="./img/icone-login.png">
            <input id="txtEmail" type="email" name="email" class="input-login" placeholder="Login" required <img class="mail" src="./img/icone-login.png">
         </div>
        

       
         <div class="iconmail">
            <img class="password" src="./img/icone-login.png">
            <input id="txtPassword" type="password" name="password" class="input-login" placeholder="Password" minlength="8" required>
         </div>
        </div>

        <div>
          <button id="btnLogin" type="button" class="btn-login">Entrar</button> 
        </div>

        <div>
          <button id="btnCadastrar" type="button" class="btn-cadastrar">Cadastrar</button> 
        </div>


    </form>
    `;

  container.innerHTML = template;
  return container;
};
