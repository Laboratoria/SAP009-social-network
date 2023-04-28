// função que o elemento HTML da Home do site
export function Home() {
  const container = document.createElement("div");
  container.id = "container"
  container.innerHTML = `<h1>Faça o seu login</h1>
    <p>Junte-se à maior rede social para leitoras do Brasil. Descubra novos livros, autores, editoras e amigas!</p>
    <form>
    <label for="username">Nome de usuário ou e-mail:</label>
    <input type="text" id="username" name="username"><br><br>
    <label for="password">Senha:</label>
    <input type="password" id="password" name="password"><br><br>
    <button type="submit">ACESSAR</button>
    </form>
    <p>É nova por aqui? <a href="#">Cadastre-se</a>.</p>
    <p>Esqueceu sua senha? <a href="#">Clique aqui</a>.</p> `
  // aqui podem ser adicionados eventos de dom (listeners, queryselector etc)
  return container
}
