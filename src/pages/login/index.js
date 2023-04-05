export default () => {
  const container = document.createElement("div");
  container.classList.add("container-login");

  const template = `
    <img class="icon-1" src="image/Rectangle 86.png">
        <section class="bloco-login">
            <div class="form-header">
                <div class="title">
                    <span>Bem Vindo a C&H</span>
                    <h1>Não tem conta?</h1>
                </div>

                <div class="button-cadastro">
                    <a href= "#cadastro" type="button" style="text-decoration:none">Cadastre-se</a>
                </div>
            </div>

            <div class="google">
                <button id="btn-gmail" type="button" class="btn-google">
                    <img class="google-icon" src="image/google.png" alt="imagem com logo do Google">
                    Continue com google
                </button>
            </div>

            <form class="form-login">
                <div class="input-group"
                    <div class="input-box">
                        <label for="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="seu endereço de e-mail" required>
                    </div>

                    <div class="input-box">
                        <label for="password">E-mail</label>
                        <input type="password" name="password" id="password" placeholder="senha" required>
                    </div>

                    <div class="forgotpassword-container">
                        <a href="#" class="forgotpassword">Esqueceu sua senha?</a>
                    </div>   

                    <div>
                        <button>
                            <a>Entrar</a>
                        </button>
                    </div>
            </form>
        </section>
    <img class="icon-2" src="image/Rectangle 83.png">
    `;

  container.innerHTML = template;

  return container;
};
