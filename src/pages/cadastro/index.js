import { createUser } from '../../servicesFirebase/firebaseAuth';

export default () => {
  const container = document.createElement('div');

  const template = `
        <div class="coluna-2">
            <div class="cadastro">
                <section class="container-cadastro">           
                    <section>
                        <section class="imagem-logo">
                            <img class="logo-escrita-escura" src="./img/logo-escrita-escura.png" alt="Logo da Brúlle com a escrita escura">
                        </section>
                        <form class="form-cadastro-cadastro">
                            <div class="nome-email-senha-container-cadastro">
                                <div class="iconname">
                                    <div class="icone"></div>
                                        <input id="txtName" type="text" name="nome" class="input-nome-cadastro" placeholder="Nome" required <img
                                        class="mail" src="./img/icone-login.png" alt="icone de usuário">
                                <div>
                                <div class="iconmail">
                                <div class="icone"></div>
                                    <input id="txtEmail" type="email" name="email" class="input-login-cadastro" placeholder="Login" required
                                    <img class="mail" src="./img/icone-login.png" alt="icone de usuário">
                            </div>
                            <div class="iconmail">
                                <div class="icone"></div>
                                    <input id="txtPassword" type="password" name="password" class="input-senha-cadastro"
                                    placeholder="Password" minlength="8" required>
                            </div>
                            <div>
                                <a href="/#cadastro"><button id="btnCreateUser" type="button"
                                    class="btn-cadastrar">Cadastrar</button>
                            </div>
                            <span class="txt-error hide" id="txtError"></span>
                            </div>

                        </form>
    </section>    
                </section> 
            </div> 
    </div>
    </div>    
    `;
  container.innerHTML = template;

/*  const criarCadastro = () => {
    const email = container.querySelector('#txtEmail').value;
    const senha = container.querySelector('#txtPassword').value;
    createUser(email, senha);
    console.log(email, senha);
    container.addEventListener('click', function (event) {
      if (event.target.id === 'btnCreateUser' && event.target.nodeName === 'BUTTON') criarCadastro()
});
};*/
  criarCadastro();
  const criarCadastro = container.querySelector('#btnCreateUser');
  criarCadastro.addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('#txtEmail').value;
    const senha = container.querySelector('#txtPassword').value;
    createUser(email, senha);
    /* .then(() => {
        window
    }

    /* ) */
  }
  )
  return container;
};
