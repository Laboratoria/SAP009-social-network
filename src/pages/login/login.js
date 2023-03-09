export default () => {
  const container = document.createElement('div');

  const template = `
  <div class="form-wrapper">
  <img src="../assets/ada-image.png" id="ada-image" alt="mulher mexendo no notebook">
  <img src="../assets/ada-logo.png" id="ada-logo" alt="logo da ConectAda">
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
      <button type="button" id="google-button"><img src="../assets/google-logo.png" id="google-logo" alt="logo do Google">Continue com o Google</button>
    </div>

    <div>
      <button type="button" id="register-button">Não tem uma conta? <a id="register-link" href="/#register">Registre-se</a></button>
    </div>

    </div>
    </form>
      `;

  container.innerHTML = template;

  return container;
};
