import {
  criarCadastro,
} from '../../firebase/firebase';

import {
  maiorDe18,
  exibeErros,
} from '../../firebase/funcoes-acessorias';

import imagemDesktop from '../../imagens/img-desktop.png';

const cadastro = () => {
  const criaCadastro = document.createElement('div');
  criaCadastro.classList.add('container-cadastro');
  const template = `
  
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

       
         <label for="filhos">Nº de filhas/os</label>
         <input type="tel" name="" id="filhos" required> <!-- tel pq aparece o teclado de nº  -->
      
         <input class="btn-enviar" type="submit" value="Enviar">
      </form>
      <div class='img-desktop'> 
       <img src="${imagemDesktop}" class="img-desktop"alt="Ilustração cadastro"
      </div> 
    </div>
  `;
  criaCadastro.innerHTML = template;

  // criação de cadastro com o firebase
  const form = criaCadastro.querySelector('.form-cadastro');
  const nome = criaCadastro.querySelector('#nome');
  const dataNascimento = criaCadastro.querySelector('#data');
  const inputEmail = criaCadastro.querySelector('#email');
  const inputSenha = criaCadastro.querySelector('#senha');
  const filhx = criaCadastro.querySelector('#filhos');

  const btnEnviar = criaCadastro.querySelector('.btn-enviar');
  btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const nomeUsuaria = document.querySelector('#nome').value;
    if (nome.value === '' || dataNascimento.value === ''
         || inputEmail === '' || inputSenha === ''
          || filhx.value === '') {
      form.reportValidity();
    } else if (inputSenha.value.length < 6) {
      alert('sua senha precisa ter mais de 6 digítos');
    } else if (maiorDe18(dataNascimento.value) === false) {
      alert('Rede social destinada a maiores de 18 anos.');
    } else {
      criarCadastro(email, senha, nomeUsuaria)
        .then(() => {
          alert('Parabéns, seu cadastro foi realizado com sucesso! Agora basta fazer o login');
          window.location.hash = '/#cadastro';
        })
        .catch((error) => {
          exibeErros(error);
        });
    }
  });
  return criaCadastro;
};

export default cadastro;
