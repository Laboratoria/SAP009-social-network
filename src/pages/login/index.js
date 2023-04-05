export default() =>{
    const container = document.createElement('div');
    container.classList.add('container-login');

    const template = `
        <section class="bloco-login">
            <header>
                <h3>Bem-vindo à C&H</h3>
                <label>Não tem conta? cadastre-se</label>
                <h1>Login</h1>
            </header>

            <section>
                <a href="#">
                <img class="logo-google" src="image/google.png" alt="imagem com logo do Google">
                Entre com a sua conta Google
                </a>
            </section>

            <form class="form-login">
                <div>   
                    <label>E-mail</label>
                    <input type="text" name="username" id="username"
                    placeholder="Digite seu e-mail">
                </div>

                <div>
                    <label>Senha</label>
                    <input type="password" name="password" id="password"
                    placeholder="Digite sua senha">
                </div>

                <div>
                    <label>Esqueci a senha</label>
                </div>

                <div>
                    <button>
                        <a>Entrar</a>
                    </button>
                </div>
            </form>
        </section>
    `;

    container.innerHTML = template;

    return container;
}
