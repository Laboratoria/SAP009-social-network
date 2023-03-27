export default () => {
  const container = document.createElement('div');

  const template = `
    
   <form class='form'>
   <section class='input'>
   <label for='email'>E-mail</label>
   <input id='email' class='user-login' type='email' required placeholder='seuemail@dominio.com'>
  
    <label for='passaword'>Senha</label>
    <input  id='passaword' class='user-login' type='passaword' required placeholder='Senha'>
    </section>

    <section class='buttons'>
      <a id='submitLogin' class='btn' href='#login'>Login</a>
    </section>

    <p class='form'>
    <a href='#cadastro' class='cadastre'>Cadastre-se</a>
    </p>

    <section class='buttons'>
    <a id='submitGoogle' class='btn' href='#login'>Entrar com o Google</a>
    </section>
   
    </form>
    `;

  container.innerHTML = template;

  return container;
};

// {/* <form>
// <label for="nomesobrenome">Nome e sobrenome</label>
// <input type="text" id="nomesobrenome" required>

// <label for="email">Email</label>
// <input type="email" id="email" required placeholder="seuemail@dominio.com">

// <label for="telefone">Telefone</label>
// <input type="tel" id="telefone" required placeholder="(XX) XXXXX-XXXX">

// <input type="submit" value="Cadastre-se" class="cadastrar">
// </form>

// <p class='form'>
// <a href='#paracadastro' class='cadastre'>Cadastre-se</a>
// </p>