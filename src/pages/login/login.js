import { signIn } from '../../firebase/auth.js';
import { getErrors } from '../../firebase/erros.js';

export default () => {
  const containerLogin = document.createElement('div');

  const loginScreen = `
  <body>
  <header>
  <img src="imagens/logo-pagina-de-login.png" alt="imagem-logo" height=150px>
  <img src="imagens/connectCurls.png" alt="mulher-logo" height=100px>
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
  <p id="erro"></p>
  </div>
  <p>Primeira vez aqui? <a href="/#register">Cadastre-se</a></p>
  </div>
  </div>
  </body>
    `;

  containerLogin.innerHTML = loginScreen;
  const inputEmail = containerLogin.querySelector('#input-digite-seu-email');
  const inputSenha = containerLogin.querySelector('#input-digite-sua-senha');
  const inputButton = containerLogin.querySelector('#button-login');
  const mensagemErro = containerLogin.querySelector('#erro');
  inputButton.addEventListener('click', () => {
    signIn(inputEmail.value, inputSenha.value)
      .then(() => { window.location.hash = '#feed'; })
      .catch((erro) => {
        mensagemErro.innerHTML = getErrors(erro);
      });
  });
  return containerLogin;
};
