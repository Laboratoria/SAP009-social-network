import { fazerLogin, loginGoogle } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');
  const template = ` 

  <header class="conteudo">
    <div class="menu-superior">
      <img class="img-logo" src="/imagens/logo-lemos.png" href="/#login">
     <h2 class="subtitulo">Incentivando a leitura feminista</h2> 
    </div>
  </header>
    <section class="conteudo-login">
    <div class = "figura-menina-texto">
      <p class="descricao">Faça parte da Le<span style= "color:#FF7373;">m</span>os , a maior rede social de incentivo e compartilhamento de leitura feminista! </p>
      <img class="menina-lemos" src="imagens/lemos-figura.png">
    </div>
    <form class="form-login">
        <h1 class="titulo-login">Login</h1>
        <input type="text" class="email-login" id="email-login" placeholder="E-MAIL" required><br>
        <input type="password" class="senha-login" id="senha-login" placeholder="SENHA" required><br>
        <p class="texto-senha"> Esqueci a senha </p>
        <p class="texto-erro" id="textoErro"></p>
        <button type="submit" class="botao-entrar">Entrar</button>
        <p class="texto-ou"> ou </p>
        <img class="botao-google" a href="#feed" src="imagens/figura-google.png"></a>
        <p class="texto-cadastro">Ainda não faz parte? <br> <a href="#cadastro">Cadastre-se aqui!</p></a>
    </form>
    
    </section>
    `;

  container.innerHTML = template;

  const loginEmail = container.querySelector('#email-login');
  const loginSenha = container.querySelector('#senha-login');
  const botaoEntrar = container.querySelector('.botao-entrar');
  const botaoGoogle = container.querySelector('.botao-google');
  const mensagemErro = container.querySelector('.texto-erro');

  botaoEntrar.addEventListener('click', (e) => {
    e.preventDefault();

    fazerLogin(loginEmail.value, loginSenha.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        window.location.hash = '#feed';
      })
      .catch(() => {
        mensagemErro.innerHTML = 'Usuário ou senha incorretos';
      });
  });

  botaoGoogle.addEventListener('click', () => {
    loginGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
        mensagemErro.innerHTML = 'Erro ao logar com Google';
      });
  });

  return container;
};
