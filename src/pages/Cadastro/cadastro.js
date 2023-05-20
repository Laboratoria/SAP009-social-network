import criarUsuario from '../../Firebase/logincadastro.js';

export default function Cadastro() {
  const containerCadastro = document.createElement('div');
  const template = `<h1>Seja bem-vinda!</h1>
  <p>Faça o seu cadastro e comece agora a compartilhar suas leituras!</p>
  <form>
  <input type="text" id="name" name="name" placeholder="Nome e sobrenome"><br><br>
  <input type="text" id="username" name="username" placeholder="Nome de usuário"><br><br>
  <input type="email" id="email" name="email" placeholder="E-mail"><br><br>
  <input type="password" id="password" name="password" placeholder="Crie uma senha"><br><br>
  <button type="submit" id="criarConta">CRIAR CONTA</button>
  </form>`;
  containerCadastro.innerHTML = template;
  const senha = containerCadastro.querySelector('#password');
  const email = containerCadastro.querySelector('#email');
  const username = containerCadastro.querySelector('#username');
  const criarConta = containerCadastro.querySelector('#criarConta');
  criarConta.addEventListener('click', (evento) => {
    evento.preventDefault();
    criarUsuario(email.value, senha.value, username.value);
  });
  return containerCadastro;
}
