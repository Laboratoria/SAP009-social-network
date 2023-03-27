export default () => {
  const registerContainer = document.createElement('div');

  const registerScreen = `
  <section>
  <a href='#login'> <img src='imagens/logout.png' alt='Botão sair' id='image-logout'> </a>
  <div id='register'> <h2> Cadastre-se </h2> </div>
  <figure> <img src='imagens/logo.png' id='register-logo' alt='Logotipo QA- Qualidade de ações'> </figure>
  </section>
 
  <section>  
  <form>
    <label class='registration-description' for='nome'> NOME COMPLETO </label>
    <input class='registration-content' name='nome' required> </input>

    <label class='registration-description' for='email'> E-MAIL </label>
    <input class='registration-content' name='email' required> </input>

    <label class='registration-description' for='senha'> NOVA SENHA </label>
    <input class='registration-content' name='senha' required> </input>

    <label class='registration-description' for='confirmar-senha'> CONFIRMAR SENHA </label>
    <input class='registration-content'name='confirmar-senha' required> </input>

    <a id= 'register-button' type='button' href='#login'> CRIAR CONTA </a>

<p id= confirmation-message> </p>

  </form>
  </section>

  <footer>
    <p>© BOOMERANG </p>
  </footer>
  `;

  registerContainer.innerHTML = registerScreen;
 //COLOCAR AQUI OS AS MANIPULAÇÕES DINAMICAS DO DOM, PEGANDO OS IDS DO HTML E/OU CSS
  // COLOCAR OS EVENTOS DOS BOTOES DE ENTRAR, ENTRAR C/ GOOGLE E CADASTRAR
  // CRIAR AS CONDICIONAIS SE O EMAIL E/OU SENHA ESTIVEREM ERRADOS, OU SE O EMAIL JÁ FOR OU NÃO CADASTRADO, ETC...
  return registerContainer;
};
