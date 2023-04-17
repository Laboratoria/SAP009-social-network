import { createUser } from '../../servicesFirebase/firebaseAuth';

import { userData } from '../../servicesFirebase/fireStore';

export default () => {
  const container = document.createElement('div');

  const template = `
        <div class="body-cadastro">
            <div class="coluna-1">
            <picture class="imagem-cadastro"></picture>
            </div>
            <div class="coluna-2">
                <div class="cadastro">
                     <button class="btn-voltar"><a href='#login'>Voltar</a></button>
                    <section class="container-cadastro">
                            <section class="imagem-logo">
                                <img class="logo-escrita-escura" src="./img/logo-escrita-escura.png" alt="Logo da Brúlle com a escrita escura">
                            </section>
                            <form class="form-cadastro-cadastro">
                                <input id="txtName" type="text" name="nome" class="input-nome-cadastro" placeholder="Nome ou Apelido" required>
                                <input id="txtEmail" type="email" name="email" class="input-login-cadastro" placeholder="Seu e-mail" required>

                                <input id="txtPassword" type="password" name="password" class="input-senha-cadastro"placeholder="Crie sua senha" minlength="8" required>

                                <button id="btnCreateUser" type="button" class="btn-cadastrar">Cadastrar</button>
                                
                                <span class="txt-error hide" id="txtError"></span>

                                </div>
                            </form>
                    </section>
                </div>
               </div>
            </div>
        </div>
    `;
  container.innerHTML = template;

  function errorMessage(error) {
    if (error.code === 'auth/email-already-exists') {
      return 'Email já cadastrado.';
    } if (error.code === 'auth/invalid-password') {
      return 'A senha precisa ter no mínimo 6 caracteres.';
    } if (error.code === 'auth/invalid-email') {
      return 'Email inválido';
    }
    return error.message;
  }

  const criarCadastro = container.querySelector('#btnCreateUser');
  criarCadastro.addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('#txtEmail').value;
    const senha = container.querySelector('#txtPassword').value;
    const nome = container.querySelector('#txtName').value;

    // if (senha.length <= 5) {
    //   mensagem.innerHTML = 'A senha deve ter no mínimo 6 caracteres.';
    // } if (!nome || !email || !senha) {
    //   mensagem.innerHTML = 'Preencha os campos corretamente.';
    // }

    createUser(email, senha, nome)
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        window.location.hash = '#login';
      })
      .catch((error) => {
        const mensagem = container.querySelector('#txtError');
        mensagem.innerHTML = errorMessage(error);
      });
  });
  return container;
};
