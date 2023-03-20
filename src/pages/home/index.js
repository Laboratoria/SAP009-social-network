export default () => {
  const container = document.createElement('div');

  const template = ` 
    <p class="descricao">Faça parte da Lemos, a maior rede social de incentivo e compartilhamento de leitura feminista! </p>
    <form class="form-login">
        <h1 class="titulo-login">Login</h1>
        <input type="text" class="email-login" id="email-login" placeholder="E-MAIL">
        <input type="password" class="senha-login" id="senha-login" placeholder="SENHA">
        <button type="submit" class="botao-entrar">Entrar</button>
        <p class = "texto-senha"> Esqueci a senha </p>

        <p class = "texto-cadastro">Ainda não faz parte? Cadastre-se aqui!</p>

    </form>
    `;
  container.innerHTML = template;
  return container;
};
