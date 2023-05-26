import { register } from '../../lib/firebase-cad.js';
// import { login } from '../login/login.js';

export function cadastro() {
  const containerCadastro = document.createElement('div');
  containerCadastro.id = 'containerCadastro';
  containerCadastro.innerHTML = ` 
  <h2>CADASTRE-SE</h2>
    <form action="/pagina-processa-dados-do-form" method="post">
    <div>
        <label for="nome">Nome:</label>
        <input type="nome" id="name-input" name="Nome" />

        <label for="email">E-mail:</label>
        <input type="email" id="email-input" name="usuario_email" />
    
        <label for="senha">Senha:</label>
        <input type="password" id= "password-input" name="senha" />
        
    </div>

    <button type="submit" id="button">Cadastrar</button>
    <button id="btn-login">Fazer login</button>   
    
    <section id= "mensagem"></section>
    
    </form>`;

  const cadastrar = containerCadastro.querySelector('#button');
  const email = containerCadastro.querySelector('#email-input');
  const senha = containerCadastro.querySelector('#password-input');
  const nome = containerCadastro.querySelector('#name-input');
  const mensagem = containerCadastro.querySelector('#mensagem');

  const registerButton = containerCadastro.querySelector('#btn-login');
  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'login';
  });

  cadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    if ((email.value, nome.value, senha.value)) {
      register(email.value, senha.value, nome.value)
        .then(mensagem.innerHTML = 'Cadastro realizado com sucesso!')
        .catch((erro) => { mensagem.innerHTML = `Falha ao realizar o cadastro: ${erro}`; });
    } else if (
      email.vale === '' || nome.value === '' || senha.value === '') {
      mensagem.innerHTML = ' Preencher todos os campos!';
    }
  });
  return containerCadastro;
}
