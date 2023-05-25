
export default function Home() {
  const container = document.createElement('div');
  const template = `<h1>Faça o seu login</h1>
  <p>Junte-se à maior rede social para leitoras do Brasil. Descubra novos livros, autores, editoras e amigas!</p>
  <form>
  <label for="username">Nome de usuário ou e-mail:</label>
  <input type="text" id="username" name="username"><br><br>
  <label for="password">Senha:</label>
  <input type="password" id="password" name="password"><br><br>
  <button id="botao" type="submit">ACESSAR</button>
  </form>
  <p>É nova por aqui? <a href="#">Cadastre-se</a>.</p>
  <p>Esqueceu sua senha? <a href="#">Clique aqui</a>.</p> `;
  container.innerHTML = template;

  const email = container.querySelector('#username');
  const password = container.querySelector('#password');

  const botao = container.querySelector('#botao');
  botao.addEventListener('click', (event) => {
    event.preventDefault();
    login(email.value, password.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        alert(error);
      });
  });
  return container;
}
