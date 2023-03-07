export default () => {
  const container = document.createElement('div');

  const template = `
      <form>
          <div>
              <input type="email" name="email" placeholder="nome@email.com" id="email"/>
          </div>
          <div>
              <input type="password" name="password" placeholder="Senha" id="password"/>
          </div>
          <div>
              <button type="button" class="btn" id="sign-in">Login</button>
          </div>
          <div>
              <p>ou</p><br/>
              <button class="btn" id="google">Continue com o Google</button>
          </div>
          <div>
              <p>Não tem uma conta?</p><button class="btn" id="register">Registre-se</button>
          </div>
          <div>
              <button class="btn" id="forgot-password">Esqueceu a sua senha?</button>
             
          </div>
      </form>
      `;

  container.innerHTML = template;  

  return container;
};
