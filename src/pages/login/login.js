export default () => {
  const containerLogin = document.createElement('div');

  const loginScreen = `
  <img src="imagens/logo-pagina-de-login.png" alt="imagem-logo">
  <img src="imagens/connectCurls.png" alt="mulher-logo">
  <h1>Seja bem-vinde!</h1>
  <label for="input-digite-seu-email">Email</label>
  <input type="digite-seu-email" placeholder="digite seu email">
  <label for="input-digite-sua-senha">Senha</label>
  <input type="digite-sua-senha" placeholder="digite sua senha">
  <input type="button" value="Entrar" id="button-login">
  <p>Primeira vez aqui? <a href="/#register">Cadastre-se</a></p>
    `;
  containerLogin.innerHTML = loginScreen;
  return containerLogin;
};
