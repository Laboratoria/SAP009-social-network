import { fazerCadastro } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <section class = "cadastro">
    <h2> Seja bem-vinda!! </h2>
    <form class = "form-cadastro"> 
        <input type = "text" class = "nome-usuaria" placeholder = "NOME/APELIDO" required> <br>
        <input type="text" class="email-cadastro" placeholder="E-MAIL" required>
        <p> Como você se identifica? </p>
        <div class="radio-buttons">
            <input type="radio"> <label for="cis">Mulher cis</label>
            <input type="radio"> <label for="trans">Mulher trans</label>
            <input type="radio"> <label for="binaria">Não binária</label>
        </div>
        <input type = "password" placeholder = "SENHA" class = "senha-cadastro" required> <br>
        <input type="password" placeholder="REPITA SUA SENHA" class = "senha-cadastro" required> <br>
        <button type="submit" class="botao-cadastrar">Cadastrar</button>
  `;

  container.innerHTML = template;

  const cadastroNome = container.querySelector('.nome-usuaria');
  const cadastroEmail = container.querySelector('.email-cadastro');
  const cadastroSenha = container.querySelector('.senha-cadastro');
  const botaoCadastrar = container.querySelector('.botao-cadastrar');
  const mensagemErro = container.querySelector('.texto-erro');

  botaoCadastrar.addEventListener('click', () => {
    fazerCadastro(cadastroNome.value, cadastroEmail.value, cadastroSenha.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        mensagemErro.innerHTML = 'Erro ao criar cadastro';
      });
  });

  return container;
};