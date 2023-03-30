import { fazerCadastro } from '../../firebase/auth.js';
import { database } from '../../firebase/firestore.js';

export default () => {
  const container = document.createElement('div');

  const template = `
  <header class="conteudo-feed">
    <div class="cabecalho">
      <img class="logo-cadastro" src="/imagens/logo-lemos.png" href="/#login">
    </div>
  </header>
  <section class="cadastro">
    <form class="form-cadastro">
      <h2 class="bem-vinda"> Seja bem-vinda! </h2>
      <div>
        <p class="textos-cadastro">Nome / Apelido</p>
        <input type="text" class="input-cadastro" id="nome-usuaria" required>
      </div>
      <div>
        <p class="textos-cadastro">E-mail</p>
        <input type="text" class="input-cadastro" id="email-cadastro" required>
      </div>
      <div class="radio-buttons">
      <p> Como você se identifica? </p>
          <div><input type="radio"> <label for="cis">Mulher cis</label></div>
          <div><input type="radio"> <label for="trans">Mulher trans</label></div>
          <div><input type="radio"> <label for="binaria">Não binária</label></div>
      </div>
      <div>
        <p class="textos-cadastro">Senha</p>
        <input type="password" class="input-cadastro" id="senha-cadastro" required>
      </div>
      <div>
        <p class="textos-cadastro">Repita sua senha</p>
        <input type="password" class="input-cadastro" required>
      </div>
        <button type="submit" class="botao-cadastrar"> Cadastrar </a> </button>
    </form>
   </section> 
  `;

  container.innerHTML = template;

  const cadastroNome = container.querySelector('#nome-usuaria');
  const cadastroEmail = container.querySelector('#email-cadastro');
  const cadastroSenha = container.querySelector('#senha-cadastro');
  const formCadastro = container.querySelector('.form-cadastro');
  const mensagemErro = container.querySelector('.texto-erro');

  formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    fazerCadastro(cadastroNome.value, cadastroEmail.value, cadastroSenha.value)
      .then(() => {
        database(cadastroNome.value, cadastroEmail.value);
        window.location.hash = '#feed';
      })
      .catch(() => {
        mensagemErro.innerHTML = 'Erro ao criar cadastro';
      });
  });

  return container;
};
