import { cadastro, logarGoogle } from "../../firebase/firebase"

export default () => {
    const container = document.createElement("div")
    const template = `
        <div class="main">
        <div class="txt-entrar"> 
            <h3>Já possui cadastro?</h3>
            <p class="txt-entrar">Clique no botão abaixo e veja as últimas atualizações dos seus amigos.</p>
            <button class="btn-entrar"><a href="#login">Entrar</a></button>
            <img src="./img/illustrations/good_dogg.png" class="ilustracao-cadastro" alt="ilustração-cadastro">
        </div>
        <div class="tela-principal">
            <div class="logo-tela">
                <img src="./img/logo/logo.png" id="logo" alt="logo-dogTips">
            </div>
            <div class="estilo-card">
                <form>
                    <label for="nometutor">Nome do tutor:</label>
                    <div class="input-card">
                        <i class="fas fa-user"></i>
                        <input type="text" id="nometutor" placeholder="Seu nome" minlength="3" required/>
                    </div>
                    <label for="nomecao">Nome do Cão:</label>
                    <div class="input-card">
                        <i class="fas fa-paw"></i>
                        <input type="text" id="nomecao" placeholder="Nome do cãozinho" minlength="3" required/> 
                    </div>
                    <label for="email">E-mail:</label>
                    <div class="input-card">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="email" placeholder="nome@dominio.com" minlength="4" required/>
                    </div>
                    <label for="senha">Senha:</label>
                    <div class="input-card">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="senha" placeholder="••••••" required/>
                    </div>
                    <div class="espaço-entrar">
                        <button type="submit" value="cadastrar" id="cadastrar" class="btn-cadastrar">CADASTRAR</button>
                    </div>
                    <p id="txtAlert" class="mensagem-vazia"><p>
                    <p class="text-cadastro-google">Ou cadastre-se com o Google</p>
                    <div class="cadastro-google"> 
                        <a href="#registro" id="registro-google" class="icon-google">
                            <i class="fa-brands fa-google"></i>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `

    container.innerHTML = template;

    const btnCadastrar = container.querySelector("#cadastrar");
    btnCadastrar.addEventListener("click", (event) => {
        const email = document.querySelector("#email").value;
        const senha = document.querySelector("#senha").value;
        const nomeCao = document.querySelector("#nomecao").value;
        const nomeTutor =document.querySelector("#nometutor").value;


        if (!email || !senha || !nomeCao || !nomeTutor) {
            // exibe uma mensagem de erro
            const msgCampoVazio = container.querySelector("#txtAlert");
        msgCampoVazio.innerHTML = "Preencha todos os campos!";
            return;
          }

        cadastro(event, email, senha);
    });
    const selecionarGoogle = container.querySelector("#registro-google")
    selecionarGoogle.addEventListener('click', () => {
        logarGoogle();
});

    return container;
}
