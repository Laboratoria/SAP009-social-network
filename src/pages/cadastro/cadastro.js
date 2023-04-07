/* eslint-disable no-console */
/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
/* eslint-disable padded-blocks */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-alert */
/* eslint-disable max-len */
import { criarCadastro, verificarEmail } from '../../firebase/firebase';
import { maiorDe18, exibeErros } from '../../firebase/funcoes-acessorias';

const cadastro = () => {
  const criaCadastro = document.createElement('section');
  const header = document.querySelector('.header');
  const template = ` 
    <img class="img-fundo" src="imagens/background_mobile_preto-removebg-preview.png" alt="">
    
    <div class="mensagem-cadastro">
      <h3>Bem-vinda à nossa área de cadastro. Por favor, preencha as informações abaixo</h3>
    </div>
    
    <div class="caixa-cadastro">
      <form class="form-cadastro">
        <label for="nome">Nome e Sobrenome</label>
        <input type="text" id="nome" required>

        <label for="data">Data de nascimento</label>
        <input type="date" name="" id="data" min="1920-01-01" max="2023-01-01" required>

        <label for="email">E-mail</label>
        <input type="email" name="" id="email" required>

        <label for="senha">Crie uma senha</label>
        <input type="password" name="" id="senha" required>

        <label for="tel">Telefone</label>
        <input type="tel" name="" id="tel" required>

        <label for="filhos">Nº de filhas/os</label>
        <input type="tel" name="" id="filhos" required> <!-- tel pq aparece o teclado de nº  -->
        
        <span class="modal mensagem-erro"><a href=""></a></span>

        <input class="btn-enviar" type="submit" value="Enviar">
        
        <a id="voltar-login" href="#">Voltar ao login</a>
      </form>
    </div>
  `;

  header.style.display = 'none';
  criaCadastro.innerHTML = template;

  // criação de cadastro com o firebase

  const form = criaCadastro.querySelector('.form-cadastro');
  const nome = criaCadastro.querySelector('#nome');
  const dataNascimento = criaCadastro.querySelector('#data');
  const inputEmail = criaCadastro.querySelector('#email');
  const inputSenha = criaCadastro.querySelector('#senha');
  const telefone = criaCadastro.querySelector('#tel');
  const filhx = criaCadastro.querySelector('#filhos');
  const erro = criaCadastro.querySelector('.mensagem-erro');
  const voltarLogin = criaCadastro.querySelector('#voltar-login');
  const btnEnviar = criaCadastro.querySelector('.btn-enviar');

  btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    // botão voltar ao login
    // se  botão voltar ao login for clicado,
    // criaCadastro.voltarLogin.addEventListener('click', () => {
    //   //window.location.hash = '#';
    //  // header.style.display = 'flex';
    //   console.log('essa oiderea funciona');
    // });

    // validações de preenchimemto do form

    if (nome.value === '' || dataNascimento.value === ''
        || inputEmail === '' || inputSenha === ''
          || telefone === '' || filhx.value === '') {

      form.reportValidity();
    } else if (inputSenha.value.length < 6) {

      alert('sua senha precisa ter mais de 6 digítos');
    } else if (maiorDe18(dataNascimento.value) === false) {

      alert('Infelizmente vc não pode acessar essa plataforma/rede social, ela é destinada para maiores de 18 anos por fazer apologia e incentivar o uso de bebida alcoólica');
    } else {

      // criação de cadastro

      criarCadastro(inputEmail.value, inputSenha.value, nome.value)
        .then(() => {

          console.log('cadastrou');
          verificarEmail()
            .then(() => {
              alert('Parabéns, seu cadastro foi realizado com sucesso! Agora basta fazer o login');
              console.log('email de confirmação enviado');
              window.location.hash = '';
              header.style.display = 'block';
            });
        })
        .catch((error) => {
          exibeErros(error);
          erro.innerHTML = exibeErros(error);
          console.log(error);
          // erro.textContent = ''; não funcionou, mas tem que apagar a mensagem de erro qndo o usuário começar a digitar
          // CRIAR UM MODAL PARA EXIBIR OS ERROS
        });
    }
  });

  return criaCadastro;
};

export default cadastro;
