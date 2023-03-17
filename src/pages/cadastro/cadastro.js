/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-alert */
/* eslint-disable max-len */
import { criarCadastro } from '../../firebase/firebase';

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
  btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    if (nome.value === '' || dataNascimento.value === ''
        || inputEmail === '' || inputSenha === ''
          || telefone === '' || filhx.value === '') {
      form.reportValidity();
    }
    else if (inputSenha.value.length < 6) {
      alert('sua senha precisa ter mais de 6 digítos');
    }
    else if (dataNascimento.value !== maiorDe18()) {
      alert('Infelizmente vc não pode acessar essa plataforma/rede social, ela é destinada para > 18 por conter fazer apologia ao uso de bebida alcoólica');
    }
    else {
      criarCadastro(inputEmail.value, inputSenha.value);
      alert('Parabéns, seu cadastro foi realizado com sucesso! Agora basta fazer o login');
      // window.location.hash = '';
      // header.style.display = 'block';
    }
    // se o email já tiver cadastrado: "Esse email já foi cadastrado anteriormente, basta fazer o login"
  });

  return criaCadastro;
};

export default cadastro;

function maiorDe18() { // parametro não ta sendo aceito pq tem mesmo nome da const
  // verificar se é maior de 18
  const criaCadastro = document.createElement('section');
  const nascimento = criaCadastro.querySelector('#data');
  const dataNascimento = nascimento.value;
  const dataAtual = new Date();
  console.log(dataAtual);

  const idadeAtual = dataNascimento.split('-');
  console.log(idadeAtual);

  const anos = dataAtual.getFullYear() - idadeAtual[2];

  // if (anos >= 19) {
  //   console.log('passa');
  //   console.log(anos);
  //   return true;
  // }
  return anos >= 19 ? true : false;
  // console.log('não passa');
  // console.log(anos);
  // return false;
}
  // const mes = idadeAtual[1] - dataAtual.getMonth();
  // const dia = idadeAtual[0] - dataAtual.getDay();
  // console.log(ano, mes, dia);
