import{ creatPost } from '../../lib/firebase-firestone.js'


export function timeline() {
    const containertimeLine = document.createElement("div");
    containertimeLine.id = "containertimeLine"
    containertimeLine.innerHTML =` 
    <h2>O QUE ESTÁ PENSANDO?</h2>
    <form action="/pagina-processa-dados-do-form" method="post">
        
    <div id="new-post" class="section-new-post">
      <div class="new-post">
        <form class="form-post">
          
          <textarea name="textarea" id="menssagem" class="new-post-menssagem" placeholder="post"></textarea>
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
    `;

  const menssagem = containertimeLine.querySelector("#menssagem");
  const titleHQ = containertimeLine.querySelector("#title-post");
 // const error = containertimeLine.querySelector("#error-msg");

 

  // Função para mandar os dados da nova postagem para o Clound Firestore
  const postButton = containertimeLine.querySelector("#post-button");
  postButton.addEventListener("click", (e) => {
    e.preventDefault();
      if (menssagem.value !=='') {
      creatPost(menssagem.value);
          menssagem.value = "";
        } else{
            window.alert('Por favor digitar a mensagem');
        }
    });

  // Quando clicar no botão excluir da nova postagem, antes de enviar, o campo fique limpo
  const deleteButton = containertimeLine.querySelector("#delete-button");
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    menssagem.value = "";
  });

  

return containertimeLine
}

export function post() {
        const containerPost= document.createElement("div");
        containerPost.id = "containerpost"
        containerPost.innerHTML =` oi`}