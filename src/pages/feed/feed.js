import { fazerLogout, auth } from '../../firebase/auth.js';
import { fazerPost, pegarPost } from '../../firebase/firestore.js';

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
    <h2 class="ultimos-posts">Últimas publicações</h2>
  </main>

  `;
  container.innerHTML = template;

  const exibirPostagem = () => {
    const localPost = container.querySelector('.ultimos-posts');
    pegarPost((post) => {
      console.log(post);
      const containerPost = document.createElement('div');
      const templatePost = `
    <div class = "nome-usuaria">
      <img class="avatar" src="/imagens/user.png">
      <h3>${auth.currentUser.displayName}</h3>
      <p class="titulo-post"> ${post.titulo}</p>
    </div>  
   `;
      containerPost.innerHTML = templatePost;
      localPost.appendChild(containerPost);
    });
  };

  const titulo = container.querySelector('.input-titulo');
  const autora = container.querySelector('.input-autora');
  const post = container.querySelector('.texto-post');
  // const tagNivel = container.querySelector('input[type=radio] [name=nivel]:checked');

  const botaoPublicar = container.querySelector('.botao-publicar');
  botaoPublicar.addEventListener('click', () => {
    fazerPost(titulo.value, autora.value, post.value);
    console.log(titulo.value, autora.value, post.value);
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
