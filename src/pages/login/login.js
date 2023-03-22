import { fazerLogin } from '../../auth';
export default () => {
  const container = document.createElement('div');

  const template = ` 
    <div class="conteudo-login">
    <div class = "figura-menina-texto">
      <p class="descricao">Faça parte da Le<span style= "color:#FF7373;">m</span>os , a maior rede social de incentivo e compartilhamento de leitura feminista! </p>
      <img class="menina-lemos" src="imagens/lemos-figura.png">
    </div>
    <form class="form-login">
        <h1 class="titulo-login">Login</h1>
        <input type="text" class="email-login" id="email-login" placeholder="E-MAIL" required><br>
        <input type="password" class="senha-login" id="senha-login" placeholder="SENHA" required><br>
        <p class="texto-senha"> Esqueci a senha </p>
        <button type="submit" class="botao-entrar">Entrar</button>
        <p class="texto-ou"> ou </p>
        <img class="botao-google" src="imagens/figura-google.png">
        <p class="texto-cadastro">Ainda não faz parte? <br> Cadastre-se aqui!</p>
    </form>
    
    </div>
    `;

  container.innerHTML = template;
  const loginEmail = container.querySelector('#email-login');
  console.log(loginEmail);

  const loginSenha = container.querySelector('#senha-login');
  console.log(loginSenha);

  const botaoEntrar = container.querySelector('.botao-entrar');
  console.log(botaoEntrar);

  botaoEntrar.addEventListener('click', () => {
    const email = loginEmail.value;
    const senha = loginSenha.value;
    fazerLogin(email, senha);
    console.log(email, senha);
  });

  return container;
};
