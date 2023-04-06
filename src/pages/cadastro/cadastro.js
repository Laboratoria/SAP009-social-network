import { cadastrar } from '../../lib/api';

export default () => {
  const container = document.createElement('div');
  const template = ` 
  <img id="logoImagem" src="imagens/logoImagem.jpeg">
  <section id="bordaCadastro">
   <form>
    <label for="nomesobrenome" class="texto">Nome e sobrenome</label><br>
    <input type="text" id="nomesobrenome" class= "inputs" required>
    
    <br><label for="email" class="texto">Email</label><br>
    <input type="email" id="email" class= "inputs" required placeholder="seuemail@dominio.com">
    
    <br><label for="telefone" class="texto">Telefone</label><br>
    <input type="tel" id="telefone" class= "inputs" required placeholder="(XX) XXXXX-XXXX">

    <br><label for="usuario" class="texto">Crie seu nome de usuário</label><br>
    <input type="text" id="usuario" class= "inputs" required>

    <br><label for="senha" class="texto">Crie uma senha</label><br>
    <input type="password" id="senha" class= "inputs" required placeholder="Senha">
    
    <br><input id="btnCadastrar" type="submit" value="Cadastrar" class="cadastrar">
    </form>
  </section>  
    `;
  container.innerHTML = template;
  const btn = container.querySelector('#btnCadastrar');
  const email = container.querySelector('#email');
  const username = container.querySelector('#usuario');
  const password = container.querySelector('#senha');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    cadastrar(username.value, email.value, password.value)
      .then((user) => {
        console.log(user);
        alert('Seu cadastro foi realizado com sucesso!');
      })
      .catch(() => {
        alert('Falha ao cadastrar');
      });
  });
  return container;
};
