const login = () => {
  const criarLogin = document.createElement('section');

  const template = `
    <div class="caixa-login">
        <form class="form-login">
          <input type="email"  placeholder="E-mail" required/>
  
          <input type="password" id="password" placeholder="Senha" required/>

          <input class="btn-entrar " type="submit" value="Entrar">

        </form>

        <section class="login-com">
          <p class="login-google">Login com</p>

<button class="btn-google" type="button"><img src="./imagens/icone google.png" alt="icone google"></button>

          <p>Ainda não possui cadastro? <br> <a href="/#cadastro">Crie sua conta!</a></p>
        </section>
    </div>
`;

  criarLogin.innerHTML = template;

  return criarLogin;
};

export default login;
