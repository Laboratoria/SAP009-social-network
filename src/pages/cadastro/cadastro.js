/* eslint-disable no-duplicate-case */
/* eslint-disable default-case */
/* eslint-disable padded-blocks */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-alert */
/* eslint-disable max-len */
import { criarCadastro, observador, verificarEmail } from '../../firebase/firebase';
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
        
        <input class="btn-enviar" type="submit" value="Enviar">
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
  // const senha = inputSenha.value; // usar para dizer que tem que ser > 6 caracters
  const btnEnviar = criaCadastro.querySelector('.btn-enviar');

  observador(); // mostra se to conectada a pag

  btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    if (nome.value === '' || dataNascimento.value === ''
        || inputEmail === '' || inputSenha === ''
          || telefone === '' || filhx.value === '') {
      form.reportValidity();
    } else if (inputSenha.value.length < 6) {
      alert('sua senha precisa ter mais de 6 digítos');
    } else if (maiorDe18(dataNascimento.value) === false) {
      alert('Infelizmente vc não pode acessar essa plataforma/rede social, ela é destinada para maiores de 18 anos por fazer apologia e incentivar o uso de bebida alcoólica');
    } else {
      criarCadastro(inputEmail.value, inputSenha.value)
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
          console.log(error);
          exibeErros(error);
          alert('error, chegou aqui');
        });
    }
    // se o email já tiver cadastrado: "Esse email já foi cadastrado anteriormente, basta fazer o login"
  });

  return criaCadastro;
};

export default cadastro;


