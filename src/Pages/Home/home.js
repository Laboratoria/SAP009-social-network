export function home() {
  const container = document.createElement("div");
  container.id = "container"
  container.innerHTML = `<h1>Bem Vindos!</h1>
    <form action="/pagina-processa-dados-do-form" method="post">
    <div>
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="usuario_email" />
    </div>
    <div>
        <label for="senha">Senha:</label>
        <input type="senha" id="senha" name="senha" />
    </div>
    <div class="btn1">
        <button type="submit">Entrar</button>
    </div>
    <div class="btn2">
        <button type="submit">Cadastrar</button>
</div>
</form>
    `

  return container
}

