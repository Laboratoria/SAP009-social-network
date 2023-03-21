export default () => {
  const container = document.createElement('div');

  const template = `
        <div class="cadastro">
            <header>
                <section class="container-cadastro">           
                    <section>
                        <section class="imagem-logo">
                        <img class="logo-escrita-escura" src="./img/logo-escrita-escura.png">
                    </section>
                    <form class="form-cadastro">
                        <div class="nome-email-senha-container-cadastro">
                            <div class="iconname">
                                <div class="icone"></div>
                                    <input id="txtName" type="text" name="nome" class="input-nome" placeholder="Nome" required <img
                                    class="mail" src="./img/icone-login.png">
                            <div>
                            <div class="iconmail">
                            <div class="icone"></div>
                                <input id="txtEmail" type="email" name="email" class="input-login" placeholder="Login" required
                                <img class="mail" src="./img/icone-login.png">
                        </div>
                        <div class="iconmail">
                            <div class="icone"></div>
                                <input id="txtPassword" type="password" name="password" class="input-senha"
                                placeholder="Password" minlength="8" required>
                        </div>
                        <div>
                            <a href="/#cadastro"><button id="btnCadastro" type="button"
                                class="btn-cadastrar">Cadastrar</button>
                        </div>
                        </div>

                    </form>
                </section> 
            </header>
        </div>
        `;
  container.innerHTML = template;
  return container;
};
