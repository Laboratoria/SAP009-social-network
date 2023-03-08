export default () => {
  const container = document.createElement('div');

  const template = `
  <form>
    <div>
      <input type="email" name="email" id="email" placeholder="seu@email.com">
      <div class="error" id="email-required-error">E-mail é obrigatório</div>
      <div class="error" id="email-invalid-error">E-mail é inválido</div>
    </div>
    
    <div>
      <input type="password" name="password" id="password" placeholder="senha">
      <div class="error" id="password-required-error">Senha obrigatória</div>
    </div>

    <div>
      <button type="button" id="login-button">Login</button>
    </div>

    <p>ou</p>

    <div>
      <button type="button">Continue com o Google</button>
    </div>

    <div>
      <button type="button" id="register-button">Não tem uma conta? <a>Registre-se</a></button>
    </div>

    <div>
      <button type="button" id="recover-password-button">Esqueceu a sua senha?</button>
    </div>
    </form>
      `;

  container.innerHTML = template;

  return container;
};
