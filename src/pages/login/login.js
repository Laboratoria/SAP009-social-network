import { autenticarUsuario, logarGoogle } from "../../firebase/firebase";
import { redirecionarPagina } from "../../redirecionar-pagina";

export default () => {
    const container = document.createElement("div")
    const template = `
        <div class="main">
            <div class="txt-novo-usuario"> 
                <h3>Primeira vez aqui?</h3>
                <p class="txt-novo-usuario">Participe da nossa comunidade, cadastre seu cão e compartilhe 
                experiências! Você poderá seguir todos seus amigos e fazer novos. 
                Além de registrar a vida do seu cão, você poderá acompanhar 
                a vida de outros cãezinhos e interagir nas publicações. </p>
                <a href="#registro">
                    <button class="btn-registrar">registre-se</button>
                </a>
                <img src="./img/illustrations/social_update.png" class="ilustracao-login" alt="ilustração-login">
            </div>
            <div class="tela-principal">
                <div class="logo-tela">
                    <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
                </div>
                <div class="estilo-card">
                    <form id="formulario-login">
                        <label for="email">E-mail:</label>
                        <div class="input-card">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="email" placeholder="nome@hotmail.com" minlength="4" required />
                        </div>
                        <label for="password">Senha:</label>
                        <div class="input-card">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="senha" placeholder="••••••" required/>
                        </div>
                        <p class="texto-centralizado"> Esqueceu sua senha?</p> 
                        <p class="texto-centralizado"><a href="#redefinirSenha"id="clique-esqueceu">Clique aqui!</a></p>
                        <div class="espaço-acessar">
                            <button class="btn-acessar">ACESSAR</button>
                        </div>
                        <div class="texto-centralizado" id="mensagem-erro"> </div>
                        <p class="texto-centralizado">Ou faça login com o Google</p>
                        <div class="cadastro-google"> 
                            <a href="#login" id="registro-google" class="icon-google">
                            <i class="fa-brands fa-google"></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
    container.innerHTML = template;
    // aqui estamos autenticando usuario com e-mail e senha (testar olhando console).
    const botaoLogin = container.querySelector(".btn-acessar");
    const formulario = container.querySelector("#formulario-login");
    const mensagemErro = container.querySelector("#mensagem-erro");

    botaoLogin.addEventListener('click', async function (e) {
        mensagemErro.innerHTML = "";
        if (formulario.checkValidity()) {
            e.preventDefault();
            const email = container.querySelector("#email").value;
            const senha = container.querySelector("#senha").value;

            try {
                console.log("autenticando usuario")
                await autenticarUsuario(email, senha);
                console.log("usuario autenticado")
                redirecionarPagina('#feed')
            } catch (error) {
                console.log('usuário ou senha inválidos');
                mensagemErro.innerHTML = "<p>Usuário ou senha inválidos</p>";
                console.log(error);
            }
        }
    });

    const selecionarGoogle = container.querySelector("#registro-google")
    selecionarGoogle.addEventListener('click', () => {
        logarGoogle();

    });
    return container;
}