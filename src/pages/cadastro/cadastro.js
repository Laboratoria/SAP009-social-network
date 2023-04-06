/* eslint-disable no-alert */
import { cadastrar } from '../../lib/api';

export default () => {
  const container = document.createElement('div');
  const template = ` 
  <img id="logoImagem" src="imagens/logoImagem.jpeg">
  <section id="bordaCadastro">
   <form class = caixaTextos>
    <label for="nomesobrenome" class="texto">Nome e sobrenome</label><br>
    <input type="text" id="nomesobrenome" class= "inputs" required placeholder="Nome e sobrenome">
    
    <br><label for="email" class="texto">Email</label><br>
    <input type="email" id="e-mail" class= "inputs" required placeholder="seuemail@dominio.com">

    <br><label for="usuario" class="texto">Crie seu nome de usuário</label><br>
    <input type="text" id="usuario" class= "inputs" required placeholder="Ususário">

    <br><label for="senha" class="texto">Crie uma senha</label><br>
    <input type="password" id="senhas" class= "inputs" required placeholder="Senha">
    
    <br><input id="btnCadastrar" type="submit" value="Cadastrar" class="cadastrar">
    </form>
    <div>
      <p class = 'msgCadastroOk'>
      </p>
    </div>
  </section>  
    `;
  container.innerHTML = template;

  const btn = container.querySelector('#btnCadastrar');
  // console.log(btn);
  const email = container.querySelector('#e-mail');
  const usuario = container.querySelector('#usuario');
  const senha = container.querySelector('#senhas');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('submeter o form');
    // console.log(email.value);
    // console.log(usuario.value);
    // console.log(senha.value);
    cadastrar(usuario.value, email.value, senha.value);
  });
  return container;
};
