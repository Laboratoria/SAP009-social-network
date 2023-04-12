import { fazerLogout, auth } from '../../firebase/auth.js';
import {
  fazerPost,
  pegarPost,
  curtirPost,
  descurtirPost,
  ordenarPost,
  excluirPost,
} from '../../firebase/firestore.js';

export default () => {
  const container = document.createElement('div');
  const template = `
  <header class="conteudo-feed">
    <div class="cabecalho-feed">
      <img class="logo-feed" src="/imagens/logo-lemos.png" href="/#login">
      <button type="button" class="botao-sair">Sair</button>
    </div>
  </header>
  <main class="feed-post">
    <div class = "nome-usuaria">
      <img class="avatar" src="/imagens/user.png">
      <h3>Olá, ${auth.currentUser.displayName} !</h3>
    </div>
    <section class="nome-livro">
      <h2 class="criar-post">Criar publicação</h2>
      <p>Título do livro</p>
      <input type="text" class="input-titulo">
    </section>
    <section class="nome-autora">
      <p>Autora</p>
      <input type="text" class="input-autora">
    </section>
    <section class="nivel-leitura">
      <p>Para qual leitora você indica esse livro?</p>
      <div class="botoes-nivel">
        <input type="radio" class="inicante" value="iniciante" name="nivel">
        <label for="iniciante">iniciante</label>
        <input type="radio" class="intermediaria" value="intermediaria" name="nivel">
        <label for="intermediaria">intermediária</label>
        <input type="radio" class="avancada" value="avancada" name="nivel">
        <label for="avancada">avançada</label>
      </div>
    </section>
    <section class="post-publicacao">
      <textarea placeholder="Limite de 350 caracteres..." class="texto-post"></textarea>
    </section>
    <button type="submit" class="botao-publicar">Publicar</button>
    <div>
      <h3 class="texto-ultimos-posts">Últimas publicações</h3>
      <div class="ultimos-posts"></div>
    </div>
  </main>

  `;
  container.innerHTML = template;

  const exibirPostagem = () => {
    const localPost = container.querySelector('.ultimos-posts');
    pegarPost((post) => {
      const containerPost = document.createElement('div');
      let somaCurtidas = post.likesUsuaria.length;
      const templatePost = `
    <div class="nome-usuaria-post">   
      <img class="avatar-post" src="/imagens/user.png">
      <h3>${post.nome}</h3>
      <p class="dia-post"> ${post.date}</p>
    </div>  
    <section class="publicacao">
      <p class="titulo-post">Título do Livro: <strong>${post.titulo}</strong></p>
      <p class="autora-post">Nome da Autora: <strong>${post.autora}</strong></p>
      <p class="texto-postagem">${post.post}</p>
    </section> 
    <div class="botao-like">
     <img id="coracao-vazio" src="/imagens/coracao-vazio.png"> 
     <img id="coracao-cheio" class="hidden" src="/imagens/coracao-preenchido.png">
      <span id="soma-likes">${somaCurtidas}</span>
      <img id="editar" src="/imagens/editar.png">
      <img id="excluir" src="/imagens/excluir.png">
    </div>
      `;
      ordenarPost();
      containerPost.innerHTML = templatePost;

      const coracaoVazio = containerPost.querySelector('#coracao-vazio');
      const coracaoCheio = containerPost.querySelector('#coracao-cheio');
      const curtidasNaTela = containerPost.querySelector('#soma-likes');
      const curtidasArray = post.likesUsuaria;

      if (curtidasArray.includes(auth.currentUser.uid)) {
        coracaoVazio.classList.add('hidden');
        coracaoCheio.classList.remove('hidden');
      }

      coracaoVazio.addEventListener('click', () => {
        coracaoVazio.classList.add('hidden');
        coracaoCheio.classList.remove('hidden');
        somaCurtidas += 1;
        curtidasNaTela.innerHTML = somaCurtidas;
        curtirPost(post.postId, auth.currentUser.uid);
      });

      coracaoCheio.addEventListener('click', () => {
        coracaoVazio.classList.remove('hidden');
        coracaoCheio.classList.add('hidden');
        somaCurtidas -= 1;
        curtidasNaTela.innerHTML = somaCurtidas;
        descurtirPost(post.postId, auth.currentUser.uid);
      });

      const botaoEditar = containerPost.querySelector('#editar');
      const botaoExcluir = containerPost.querySelector('#excluir');

      if (post.userId === post.id) {
        alert("teste ok")
        botaoEditar.classList.add('hidden');
        botaoExcluir.classList.add('hidden');
      }

      localPost.appendChild(containerPost);
    });
  };

  const titulo = container.querySelector('.input-titulo');
  const autora = container.querySelector('.input-autora');
  const postagem = container.querySelector('.texto-post');

  function limparForm() {
    container.querySelector('.input-titulo').value = '';
    container.querySelector('.input-autora').value = '';
    container.querySelector('.texto-post').value = '';
  }
  const botaoPublicar = container.querySelector('.botao-publicar');
  botaoPublicar.addEventListener('click', async () => {
    await fazerPost(titulo.value, autora.value, postagem.value);
    limparForm();
  });

  const botaoSair = container.querySelector('.botao-sair');
  botaoSair.addEventListener('click', () => {
    fazerLogout()
      .then(() => {
        window.location.hash = '#login';
      })
      .catch(() => {
      });
  });
  exibirPostagem();
  return container;
};
