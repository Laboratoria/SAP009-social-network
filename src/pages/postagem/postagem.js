/* eslint-disable no-unused-vars */
// import { async } from 'regenerator-runtime';
import { observador, sair } from '../../firebase/firebase';
import { paraPostar, postagens, mostraPostAutomaticamente, deletaPost } from '../../firebase/firebase-storage';
import { pegaDados } from '../../firebase/funcoes-acessorias';

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
        <textarea name="novo-texto" id="novo-texto" class="digita-texto" cols="30%" rows="4%"></textarea>
        <button class="btn-postar">Postar</button>
      </section>
  </div>

  <div class="postagem-amigas">
    <div class="container">
      <section class="postagem-data">
        <p class="data-postagem">xx/xx/xxxx</p>
        <div class="digita-texto" id="postagens-anteriores"></div>
      </section>
    </div>
  </div>
`;
  header.style.display = 'block';

  criarPostagem.innerHTML = template;

  const btnSair = criarPostagem.querySelector('.btn-sair');

  // VERIFICA USUÁRIO ON/OFF
  observador();

  // DESLOGAR
  btnSair.addEventListener('click', () => {
    sair();
    window.location.hash = '';
  });

  // ARMAZENA OS POSTS NO CONSOLE DO FIREBASE

  const novoTexto = criarPostagem.querySelector('#novo-texto');

  const btnPostar = criarPostagem.querySelector('.btn-postar');

  btnPostar.addEventListener('click', () => {
    paraPostar(novoTexto.value); // cria a memoria de arq p/ postar
    novoTexto.value = '';
  });

  // MOSTRA NA TELA, APAGA E EDITA TODOS OS POSTS ARMAZENADOS NO FIREBASE

  const postagensAnteriores = criarPostagem.querySelector('#postagens-anteriores');

  postagens().then((post) => {
    postagensAnteriores.innerHTML = pegaDados(post);
    // console.log(post);

    // DELETAR POSTS
    const btnDeletaPost = criarPostagem.querySelectorAll('.deleta-post');
    const btnEditaPost = criarPostagem.querySelectorAll('.edita-post');
    btnDeletaPost.onclick = (e) => {
      // deletaPost(e.target.dataset.id);
      console.log('deletado');
    };
  });

  return criarPostagem;
};

export default postagem;
