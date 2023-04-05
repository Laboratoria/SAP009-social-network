export default () => {
  const container = document.createElement("div");
  container.classList.add("container-cadastro");

  const template = `
    <img class = "icon" src="image/Rectangle 86.png" alt="imagem de menina lavando o rosto">
    <section class = "bloco-cadastro">
        <div class="form-header">
            <div class="title">
                <span>Bem Vindo a C&H</span>
                <h1>Cadastre-se</h1>
            </div>

            <div class="return-button">
                <a href= "#login" type="button" class="btnVoltar" style="text-decoration:none">Voltar</a>
            </div>
        </div>

        <form class = "form-cadastro">
            <div class="input-group">
                <div class="input-box">
                    <label for="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="seu endereço de e-mail" required>
                </div>

                <div class="input-box">
                    <label for="name">Nome</label>
                    <input type="text" name="name" id="txtName" placeholder="seu nome" required>
                </div>

                <div class="input-box">
                    <label for="number">Número</label>
                    <input type="tel" name="number" id="number" placeholder="(xx) xxxx-xxxx" required>
                </div>

                <div class="input-box">
                    <label for="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="senha" required>
                </div>
            </div>

            <div class="button-singnup">
                <button id="btnSignup" type="button" class="btnSignup" style="text-decoration:none">Criar Conta</button>
            </div>
        </form>
    </section>
    <img class="icon" src="image/Rectangle 83.png" alt="imagem de menina mexendo no cabelo">
    `;
  container.innerHTML = template;
  return container;
};
