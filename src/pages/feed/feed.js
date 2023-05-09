// função que o elemento HTML da Home do site
export default function Feed() {
  const containerFeed = document.createElement("div");
  containerFeed.id = "containerFeed"
  containerFeed.innerHTML = `<title>A rede social para leitoras</title>
  <h1>Olá, !</h1>
  <p>Compartilhe sua opinião, indique seus livros favoritos e curta as leituras das suas amigas!</p>
  
  <div class="container2">
  <label>O que você está lendo no momento?</label><br>
  <textarea></textarea><br>
  </div>
  <div class="buttons">
  <button type="button">Gostei</button>
  <button type="button">Não Gostei</button>
  <button type="button">Lendo</button>
  <button type="button">Salvar</button>
  </div>`
  return containerFeed
  }
