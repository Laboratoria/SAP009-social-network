export default () => {
    const container = document.createElement('div');
  
    const template = ` 
    <form>
    <label for="nomesobrenome">Nome e sobrenome</label>
    <input type="text" id="nomesobrenome" required>
    
    <label for="email">Email</label>
    <input type="email" id="email" required placeholder="seuemail@dominio.com">
    
    <label for="telefone">Telefone</label>
    <input type="tel" id="telefone" required placeholder="(XX) XXXXX-XXXX">
    
    <input type="submit" value="Cadastrar" class="cadastrar">
    </form>
    
    `;
    container.innerHTML = template;

    return container;
  };