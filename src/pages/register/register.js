export default () => {
  const container = document.createElement('div');

  const template = `
  <div class="form-wrapper">
  <img src="./assets/ada-image.png" id="ada-image" alt="mulher mexendo no notebook">
  <img src="./assets/ada-logo.png" id="ada-logo" alt="logo da ConectAda">
  <form>
    <div>
      <input type="text" name="user-name" id="user-name" placeholder="nome completo">
      <input type="email" name="email" id="email" placeholder="seu@email.com">
      <div class="error" id="email-required-error">E-mail é obrigatório</div>
      <div class="error" id="email-invalid-error">E-mail é inválido</div>
    </div>

    <div>
      <input type="password" name="password" id="password" placeholder="senha">
      <div class="error" id="password-required-error">Senha obrigatória</div>
    </div>

    <div>
      <button type="button" id="login-button" href="#timeline">Login</button>
    </div>

    <div>
      <button type="button" id="login-button">Já tem uma conta? <a id="login-link" href="#login">Login</a></button>
    </div>

  </form>
</div>
`;

  container.innerHTML = template;

  return container;
};
