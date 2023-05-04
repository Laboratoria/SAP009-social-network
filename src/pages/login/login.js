// import{ signIn } from '../../firebase/auth.js'
export default () => {
  const containerLogin = document.createElement('div');

  const loginScreen = `
  <body>
  <header>
  <img src="imagens/logo-pagina-de-login.png" alt="imagem-logo" height=200px>
  <img src="imagens/connectCurls.png" alt="mulher-logo" height=150px>
  </header>
  <div class= "wrapper">
  <h1>Seja bem-vinde!</h1>
  <div class= "row">
  <div class= "form-group">
  <label for="input-digite-seu-email">Email</label>
  <input id="input-digite-seu-email" type="email" placeholder="digite seu email">
  <label for="input-digite-sua-senha">Senha</label>
  <input id="input-digite-sua-senha" type="password" placeholder="digite sua senha">
  <input type="button" value="Entrar" id="button-login">
  </div>
  <p>Primeira vez aqui? <a href="/#register">Cadastre-se</a></p>
  </div>
  </div>
  </body>
    `;

  containerLogin.innerHTML = loginScreen;
  /* const inputEmail = containerLogin.querySelector('#input-digite-seu-email');
  const inputSenha = containerLogin.querySelector('#input-digite-sua-senha');
  const inputButton = containerLogin.querySelector('#button-login');
  inputButton.addEventListener('click', () => {
    signIn(inputEmail.value, inputSenha.value)
  .then((mensagem) => console.log(mensagem));
  .catch((erro) => console.log(erro));
  }); */
  return containerLogin;
};
