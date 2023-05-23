import { register } from '../../../Firebase/cadastro.js';

export default function Cadastro() {
  const containerCadastro = document.createElement('div');
  containerCadastro.id = 'containerCadastro';
  containerCadastro.innerHTML = `
  <h1>Seja bem-vinda!</h1>
  <p>Faça o seu cadastro e comece agora a compartilhar suas leituras!</p>
  <form>
  <input type="text" id="name-input" name="name" placeholder="Nome e sobrenome"><br><br>
  <input type="text" id="username" name="username" placeholder="Nome de usuário"><br><br>
  <input type="email" id="email-input" name="email" placeholder="E-mail"><br><br>
  <input type="password" id="password-input" name="password" placeholder="Crie uma senha"><br><br>
  <button id='button' type="submit">CRIAR CONTA</button>
  <p id="mensagem"></p>
  </form>`;

  const cadastrar = containerCadastro.querySelector('#button');
  const email = containerCadastro.querySelector('#email-input');
  const senha = containerCadastro.querySelector('#password-input');
  const nome = containerCadastro.querySelector('#name-input');
  const mensagem = containerCadastro.querySelector('#mensagem');

  cadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    if ((email.value, nome.value, senha.value)) {
      register(email.value, senha.value)
        .then(mensagem.innerHTML = 'Cadastro realizado com sucesso!')
        .catch((erro) => { mensagem.innerHTML = `Falha ao realizar o cadastro: ${erro}`; });
    } else if (
      email.value === '' || nome.value === '' || senha.value === '') {
      mensagem.innerHTML = 'Preencher todos os campos!';
    }
  });
  return containerCadastro;
}
