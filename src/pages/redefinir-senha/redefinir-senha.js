import {redefinirSenha} from "../../firebase/firebase";

export default () => {
  const container = document.createElement("div")
  const template = `
  <div class="main">
   <div class="txt-voltar">
  <button class="btn-voltar"><a href="#login">Voltar</a></button>
  <img src="./img/illustrations/dog_pop.png" class="ilustracao-redefinir-senha" alt="ilustração-redefinir-senha">
  </div>
  <div class="tela-principal">
    <div class="logo-tela-redefinir">
      <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
    </div>
    <div class="estilo-card-redefir-senha">
      <form>
        <label class="label-esqueceu-senha">Para redefinir sua senha, informe o endereço de e-mail cadastrado: </label>
        <div class="input-card">
          <i class="fas fa-envelope"></i>
          <input type="email" id="email" placeholder="E-mail" minlength="4" required />
        </div>
        <div class="espaço-redefinir">
        <button type="submit" class="btn-redefinir-senha" id="btn-redefinir-senha">REDEFINIR SENHA</button>
        </div>
        </div>
    </form>
    <p id="msg-redefine-senha" class="msg-redefine-senha"></p>
  </div>
  </div>
`
  container.innerHTML = template;


  const botaoRedefinir = container.querySelector('#btn-redefinir-senha');
  botaoRedefinir.addEventListener('click', function (e) {
    e.preventDefault();
    const email = container.querySelector("#email").value;
    redefinirSenha(email)
      .then(() => {
        const msgConfirmaRedefinicao = container.querySelector("#msg-redefine-senha");
        msgConfirmaRedefinicao.innerHTML = "Em breve, você receberá um e-mail com todas as instruções para redefinir sua senha.";
      })
      .catch((error) => {
        const msgErroRedefinicao = container.querySelector("#msg-redefine-senha");
        if (error.code === "auth/user-not-found") {
          msgErroRedefinicao.innerHTML = "O e-mail informado não está cadastrado em nosso sistema.";
        }
      });
  });


  return container;
}