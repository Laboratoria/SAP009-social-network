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
    
    <br><input type="submit" value="Cadastrar" class="cadastrar">
    </form>
  </section>  
    `;
  container.innerHTML = template;

  return container;
};