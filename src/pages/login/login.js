import { signIn } from '../../firebase/auth.js';
import { getErrors } from '../../firebase/erros.js';

export default () => {
  const containerLogin = document.createElement('div');

  const loginScreen = `
  <body>
  <header class="cabeçalho_imagens">
    <img src="imagens/logo-pagina-de-login.png" alt="imagem-logo" height="200" class="img_logo">
    <img src="imagens/connectCurls.png" alt="mulher-logo" height="150" class="img_mulher">
    <h1>Seja bem-vinde!</h1>
  </header>
      <div class="form-group">
        <label for="input-digite-seu-email" class="text_form">Email</label>
        <input id="input-digite-seu-email" type="email" placeholder="Digite seu email" class="input_email">
        <label for="input-digite-sua-senha" class="texto_form">Senha</label>
        <input id="input-digite-sua-senha" type="password" placeholder="Digite sua senha" class="input_senha">
        <input type="button" value="Entrar" id="button-login">
        <p id="erro"></p>
      </div>
      <p class="text_register">Primeira vez aqui? <a href="/#register">Cadastre-se</a></p>
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
