export function timeline() {
  const containertimeLine = document.createElement('div');
  containertimeLine.id = 'containertimeLine';
  containertimeLine.innerHTML = `
    <form action="/pagina-processa-dados-do-form" method="post">
  
    <div id="new-post" class="section-new-post">
      <div class="new-post">
        <div id="name" class="name-user">Olá,</div>
        <form class="form-post">
          <input type="text" id="title-post" class="title-post" placeholder="Título do quadrinho"/>
          <textarea name="textarea" id="menssagem" class="new-post-menssagem" placeholder="Conte em mais de 20 caracteres sobre o quadrinho que você esta lendo"></textarea>
          <span id="error-msg" class="error-msg"></span>
          <div class="buttons-post-delete">
            <button id="post-button" class="post-button">postar</button>
            <button id="delete-button" class="delete-button">excluir</button>
          </div>  
        </form>
      </div>
    </div>

    <div class="posts-containertimeLine">
      <ul id="user-all-posts" class="ul-posts"></ul>
    </div>
</form>`;

  return containertimeLine;
}

