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
                <button>
                    <img class="logo-google" src="image/google.png" alt="imagem com logo do Google">
                    <a>Entrar com Google</a>
                </button>
            </section>

            <form class="form-login">
                <div>
                    <label>Email</label>
                    <input placeholder="seu email"></input>
                </div>

                <div>
                    <label>Senha</label>
                    <input placeholder="sua senha"></input>
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