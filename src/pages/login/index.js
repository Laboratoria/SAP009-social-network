import { login } from "../firebase/auth.js";

export default () => {
  const container = document.createElement("div");
  container.classList.add("container-login");

  const template = `
        <img class="icon" src="image/Rectangle 86.png" alt="imagem de menina mexendo no cabelo">
        <section class="bloco-login">
            <header class="form-header">
                <div class="welcome-title">
                    <h3>Bem-vindo à C&H</h3>
                    <h1>Login</h1>
                </div>
                <div class="welcome-title">
                    <label>Não tem conta?</label>
                    <a href="#cadastro" type="button" style="text-decoration:none">Cadastre-se</a>
                </div>
            </header>

            <form class="form-login">
                <div class="input-group">
                    <div class="input-box">   
                        <label>E-mail</label>
                        <input type="text" name="username" id="username"
                        placeholder=" seu e-mail">
                    </div>

                    <div class="input-box">
                        <label>Senha</label>
                        <input type="password" name="password" id="password"
                        placeholder="senha">
                    </div>

                    <div class="forgot-password">
                        <a href="#">Esqueci a Senha</a>
                    </div>

                    <div class="button-enter">
                        <button id="enter" type="submit" class="enter" style="text-decoration:none">Entrar</button>
                    </div>

                    <div class"option"
                        <span class="other">ou</span>
                    </div>

                    <div class="btnGoogle">                        
                        <button id="google" type="button" class="google" style="text-decoration:none"><img class="logo-google" src="image/google.png" alt="imagem com logo do Google">Entrar com Google</button>
                    </div>
                </div>
            </form>
        </section>
        <img class="icon" src="image/Rectangle 83.png" alt="imagem de menina mexendo no cabelo">
    `;

  container.innerHTML = template;

  const form = container.querySelector(".form-login");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    login(username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  });

  return container;
};
