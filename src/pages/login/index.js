export default() =>{
    const container = document.createElement('div');
    container.classList.add('container-login');

    const template = `
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

            <section class="btnGoogle">
                <a href="#">
                <img class="logo-google" src="image/google.png" alt="imagem com logo do Google">
                Entre com a sua conta Google
                </a>
            </section>

            <form class="form-login">
                <div class="input-group">
                    <div class="input-box">   
                        <label>E-mail</label>
                        <input type="text" name="username" id="username"
                        placeholder="Digite seu e-mail">
                    </div>

                    <div class="input-box">
                        <label>Senha</label>
                        <input type="password" name="password" id="password"
                        placeholder="Digite sua senha">
                    </div>

                    <div class="label-password">
                        <label>Esqueci a senha</label>
                    </div>

                    <div>
                        <button>
                            <a>Entrar</a>
                        </button>
                    </div>
                </div>
            </form>
        </section>
    `;

    container.innerHTML = template;

    return container;
}
