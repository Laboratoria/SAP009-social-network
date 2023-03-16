import { fazerLogin } from '../../firebase/firebase';

const criarLogin = document.createElement('section');

const login = () => {
  const template = `
    <div class="caixa-login">
      <form class="form-login">
        <input id="login-email" type="email"  placeholder="E-mail" required/>

        <input id="login-senha" type="password" id="password" placeholder="Senha" required/>

        <input class="btn-entrar " type="submit" value="Entrar">
      </form>

    <section class="login-com">
      <p class="login-google">Login com</p>

      <button class="btn-google" type="button">
        <img src="./imagens/icone google.png" alt="icone google">
      </button>

      <p>Ainda não possui cadastro? <br> <a href="/#cadastro">Crie sua conta!</a></p>
    </section>
  </div> 
`;

  criarLogin.innerHTML = template;

  return criarLogin;
};

export default login;

// const inputLoginEmail = criarLogin.querySelector('#login-email');

// const inputLoginSenha = criarLogin.querySelector('#login-senha');

// const btnEntrar = criarLogin.querySelector('.btn-entrar');

// btnEntrar.addEventListener('submit', () => {
//   const loginEmail = inputLoginEmail.value;
//   const loginSenha = inputLoginSenha.value;

//   fazerLogin(loginEmail, loginSenha);
// });
