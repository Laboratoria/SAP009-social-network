/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { sair, nomeUsuaria, auth } from '../../firebase/firebase-auth';
import {
  paraPostar, mostraPostAutomaticamente, deletaPost, editaPost, atualizaEdicao, ordenaPosts, curtirPost, descurtirPost,
} from '../../firebase/firebase-storage';

import { pegaDados } from '../../firebase/funcoes-acessorias';

const postagem = () => {
  const header = document.querySelector('.header');
  const criarPostagem = document.createElement('div');
  const template = `
  <div class="imagem-postagem-desktop desktop">
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
      <p class="sem-texto"></p>
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

  const teste = async () => {
    // chamei aqui a função de ordenar pq ela reune os post já feitos e ordena
    return ordenaPosts().then((post) => {
      // MOSTRAR NA TELA
      postagensAnteriores.innerHTML = pegaDados(post);

      // DELETAR POSTS
      const btnDeletaPost = criarPostagem.querySelectorAll('.btn-excluir');

      btnDeletaPost.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const apagou = deletaPost(e.target.dataset.id);
          if (apagou) {
            alert('deseja realmente apagar o post?'); // colocar um modal
            return apagou;
          }
        });
      });

      // EDITAR POSTS
      const textoEdicao = criarPostagem.querySelector('#novo-texto');
      const btnEditaPost = criarPostagem.querySelectorAll('.btn-editar');

      btnEditaPost.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const edit = await editaPost(e.target.dataset.id);
          const editarTexto = edit.data();
          textoEdicao.value = editarTexto.descricao;
          editar = true;
          id = edit.id;
        });
      });

      // CURTIR POSTS
      const curtidas = criarPostagem.querySelector('.numero-curtidas').textContent;
      const btnCurtir = criarPostagem.querySelectorAll('.btn-curtir');
      btnCurtir.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const idBtn = btn.dataset.id;
          curtirPost(idBtn, Number(curtidas));
          console.log(curtidas);
          // if (idBtn) {
          //   curtirPost(idBtn, Number(curtidas));
          //   console.log(curtidas);
          // } else if (!idBtn) {
          //   descurtirPost(idBtn, Number(curtidas));
          //   console.log(curtidas);
          // }
        });
      });
    });
  };

  // ENVIA OS POSTS PARA ARMAZENAR NO CONSOLE DO FIREBASE
  const novoTexto = criarPostagem.querySelector('#novo-texto');
  const digiteTexto = criarPostagem.querySelector('.sem-texto');
  const btnPostar = criarPostagem.querySelector('.btn-postar');

  btnPostar.addEventListener('click', () => {
    if (editar) {
      atualizaEdicao(id, { descricao: novoTexto.value });
      editar = false;
      novoTexto.value = '';
    } else if (novoTexto.value === '') {
      digiteTexto.innerHTML = 'Por favor, digite um texto';
    } else {
      paraPostar(novoTexto.value); // cria no console do firebase os arq p/ postar
      novoTexto.value = '';
    }
  });

  mostraPostAutomaticamente(teste);

  return criarPostagem;
};

export default postagem;
