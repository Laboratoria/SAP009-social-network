export default function Cadastro() {
  const containerCadastro = document.createElement('div');
  const template = `<h1>Seja bem-vinda!</h1>
  <p>Faça o seu cadastro e comece agora a compartilhar suas leituras!</p>
  <form>
  <input type="text" id="name" name="name" placeholder="Nome e sobrenome"><br><br>
  <input type="text" id="username" name="username" placeholder="Nome de usuário"><br><br>
  <input type="email" id="email" name="email" placeholder="E-mail"><br><br>
  <input type="password" id="password" name="password" placeholder="Crie uma senha"><br><br>
  <button type="submit">CRIAR CONTA</button>
  </form>`;
  containerCadastro.innerHTML = template;

  return containerCadastro;
}
