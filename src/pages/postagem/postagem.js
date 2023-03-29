/* eslint-disable no-unused-vars */
// import { async } from 'regenerator-runtime';
import { observador, sair } from '../../firebase/firebase';
import { paraPostar, mostraPostagens, quandoDadosForemAdicionados } from '../../firebase/firebase-storage';
import { imprimePosts } from '../../firebase/funcoes-acessorias';

const postagem = () => {
  const header = document.querySelector('.header');
  const criarPostagem = document.createElement('div');
  const template = `
    <div class="botao">
    <button class="btn-sair">Sair</button></div>

    <div class="postagem">
      <div class="mensagem-ola">
        <p class="paragrafo">Olá usúaria, seja bem-vinda! <br> O que você deseja compartilhar?</p>
      </div>
      
      <section class="novo-post">
        <textarea name="novo-texto" id="novo-texto" class="novo-texto" cols="30%" rows="4%"></textarea>
        <button class="btn-postar">Postar</button>
      </section>
      
      <span class="icones-inferiores">
        <i class="fa-sharp fa-regular fa-delete-left"></i>
        <i class="fa-sharp fa-solid fa-pen-to-square"></i>
      </span>
  </div>

  <div class="postagem-amigas">
    <div class="container">
      <section class="postagem-data">
        <p class="data-postagem">xx/xx/xxxx</p>
      </section>
      <section class="ultimo-post">
        <div class="" id="postagens-anteriores">
          <span class="postagens-anteriores">@@ </span>
          <i class="fa-solid fa-circle-heart"></i>
        </div>
      </section>
    </div>
  </div>
`;
  header.style.display = 'block';

  criarPostagem.innerHTML = template;

  const btnSair = criarPostagem.querySelector('.btn-sair');

  observador();
  // DESLOGAR
  btnSair.addEventListener('click', () => {
    sair();
    window.location.hash = '#';
  });

  // CRIAR AQUI A MANIPULAÇÃO DO DOM PARA CRIAR POSTS E TUDO O MAIS

  const novoTexto = criarPostagem.querySelector('#novo-texto');

  const btnPostar = criarPostagem.querySelector('.btn-postar');

  const postagensAnteriores = criarPostagem.querySelector('.postagens-anteriores');

  btnPostar.addEventListener('click', async () => {
    paraPostar(novoTexto.value); // cria a memoria de arq p/ postar

    // manipular o array de objetos par tranformar em hmtl com ts

    postagensAnteriores.innerHTML += imprimePosts(await mostraPostagens());
    // postagensAnteriores.textContent = '';
    const funcao = mostraPostagens();

    console.log(funcao);
  });

  return criarPostagem;
};

export default postagem;
