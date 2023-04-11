/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
// import { async } from 'regenerator-runtime';
import { sair, dadosUsuaria, nomeUsuaria } from '../../firebase/firebase-auth';
import {
  paraPostar, postagens, mostraPostAutomaticamente, deletaPost, editaPost, atualizaEdicao, ordenaPosts, curtirPost,
} from '../../firebase/firebase-storage';

import { pegaDados } from '../../firebase/funcoes-acessorias';

const postagem = () => {
  const header = document.querySelector('.header');
  const criarPostagem = document.createElement('div');
  const template = `
  <div class="imagem-desktop desktop">
    <img class="img-desktop" src="imagens/enchendo_taça_de_vinho-removebg-preview.png" alt="imagem  de garrafa derramand liquido em uma taça">
  </div>

  <div class="container-txt">
    <div class="botao">
      <button class="btn-sair">Sair</button>
    </div>
    
    <div class="postagem">
      <div class="mensagem-ola">
        <p class="paragrafo">Olá ${nomeUsuaria()}, seja bem-vinda! <br> O que você deseja compartilhar?</p>
      </div>
    </div>

    <section class="novo-post">
      <textarea name="novo-texto" id="novo-texto" cols="30%" rows="4%"></textarea>
      <button class="btn-postar">Postar</button>
    </section>

    <div class="digita-texto" id='postagens-anteriores'></div>
  </div>
    `;

  header.style.display = 'block';

  criarPostagem.innerHTML = template;

  // DESLOGAR
  const btnSair = criarPostagem.querySelector('.btn-sair');
  btnSair.addEventListener('click', () => {
    sair();
    window.location.hash = '';
  });

  // MOSTRA NA TELA, APAGA E EDITA TODOS OS POSTS ARMAZENADOS NO FIREBASE
  const postagensAnteriores = criarPostagem.querySelector('#postagens-anteriores');

  let editar = false;
  let id = '';

  const teste = async () => { // colocando o async aqui posso usar await em qualquer lugar abaixo
    return ordenaPosts().then((post) => {
      // MOSTRAR NA TELA
      postagensAnteriores.innerHTML = pegaDados(post);
      // postagensAnteriores.innerHTML = ordenaPosts();

      // chamei aqui a função de ordenar

      // DELETAR POSTS
      const btnDeletaPost = criarPostagem.querySelectorAll('.btn-excluir');

      btnDeletaPost.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const apagou = deletaPost(e.target.dataset.id);
          // console.log('deletado com sucesso');
          // preciso acrescentar a usuaria para ter o id e assim o butão vai funcionar
          return apagou;
        });
      });

      // EDITAR POSTS
      const textoEdicao = criarPostagem.querySelector('#novo-texto');
      const btnEditaPost = criarPostagem.querySelectorAll('.btn-editar');

      btnEditaPost.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const edit = await editaPost(e.target.dataset.id);
          // console.log('editar clicado');
          const editarTexto = edit.data();
          textoEdicao.value = editarTexto.descricao;
          editar = true;
          id = edit.id;
        });
      });

      // CURTIR POSTS
      const curtidas = criarPostagem.querySelector('.numero-curtidas').textContent;
      // const qtdCurtidas = Number(curtidas) + 1;
      // console.log(qtdCurtidas); soma feita lá na função // curtidas.innerText = qtdCurtidas;
      const btnCurtir = criarPostagem.querySelectorAll('.btn-curtir');
      console.log(btnCurtir);
      btnCurtir.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const idBtn = btn.dataset.id;
          console.log(idBtn, e.target);
          curtirPost(idBtn, Number(curtidas));
        });
      });
    });
  };

  // ENVIA OS POSTS PARA ARMAZENAR NO CONSOLE DO FIREBASE

  const novoTexto = criarPostagem.querySelector('#novo-texto');
  const btnPostar = criarPostagem.querySelector('.btn-postar');

  btnPostar.addEventListener('click', () => {
    if (editar) {
      atualizaEdicao(id, { descricao: novoTexto.value });
      editar = false;
      novoTexto.value = '';
    } else {
      paraPostar(novoTexto.value); // cria a memoria de arq p/ postar
      novoTexto.value = '';
    }
  });

  mostraPostAutomaticamente(teste);
  // chamei aqui a função de ordenar

  return criarPostagem;
};

export default postagem;
