import { fazerLogout } from '../../firebase/auth.js';

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
    <section class="nome-livro">
      <h2 class="criar-post">Criar postagem</h2>
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
        <button class="iniciante">iniciante</button>
        <button class="intermediaria">intermediária</button>
        <button class="avancada">avançada</button>
      </div>
    </section>
    <section class="post-publicacao">
      <textarea placeholder="Limite de 350 caracteres..."></textarea>
    </section>
    <button type="submit" class="botao-publicar">Publicar</button>
    <h2 class="ultimos-posts">Últimas publicações</h2>
  </main>

  `;

  container.innerHTML = template;

  const botaoSair = container.querySelector('.botao-sair');
  botaoSair.addEventListener('click', () => {
    fazerLogout()
      .then(() => {
        window.location.hash = '#login';
      })
      .catch(() => {

        alert('Obrigada por visitar a Lemos!');
      });
  });

  return container;
};
