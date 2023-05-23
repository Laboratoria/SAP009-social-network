import{ creatPost, deletePost, getPosts} from '../../lib/firebase-firestone.js'


export function timeline() {
    const containertimeLine = document.createElement("div");
    containertimeLine.id = "containertimeLine"
    containertimeLine.innerHTML =`
    <form action="/pagina-processa-dados-do-form" method="post">
  
          
    <div id="new-post" class="section-new-post">
      <div class="new-post">
        <div id="name" class="name-user">Olá,</div>
        <form class="form-post">
          
          <textarea name="textarea" id="menssagemtime" class="new-post-menssagemtime" placeholder="post"></textarea>
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


     

  const menssagemtime = containertimeLine.querySelector("#menssagemtime");
 
 

  // Função para mandar os dados da nova postagem para o Clound Firestore
  const postButton = containertimeLine.querySelector("#post-button");
  postButton.addEventListener("click", (e) => {
    e.preventDefault();
      if (menssagemtime.value !=='') {
      creatPost(menssagemtime.value);
          menssagemtime.value = "";
        } else{
            window.alert('Por favor digitar a mensagem');
        }
    });

  // Quando clicar no botão excluir da nova postagem, antes de enviar, o campo fique limpo
  const deleteButton = containertimeLine.querySelector("#delete-button");
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    menssagemtime.value = "";
  });

  getPosts();

return containertimeLine
}

export function posts (post) {
console.log("posts")      
  
  const containerposts = document.createElement("div");
  containerposts.classList.add("body-template-post");
  containerposts.id = "containerposts"
  containerposts.innerHTML =`
  <div class="section-post-published">
    <p class="username-post">${post.user}</p>
    <p class="date-post">${post.data}</p>
    <p class="menssagem-post">${post.menssagem}</p>
    <div class="container-like">
      <div class="buttons-edit-delete">
      <button class="edit-button">editar</button>
      <button class="post-delete-button">excluir</button>
    </div>
    <span class="error-edit"></span>
  </div>
  
`;
;

const deleteButton = containerposts.querySelector(".post-delete-button");
deleteButton.addEventListener("click", () => {
deletePost(post.id).then(() => {
if (confirm("Você tem certeza?")) { // eslint-disable-line no-restricted-globals
  containerposts.remove();
} else {
  window.location.hash = "posts";
}
}).catch(() => {
error.textContent = "não foi possivel deletar o post.";
});
});


// Função que edita o post (editButton vai mandar para a pagina de edição)
const menssagem = containerposts.querySelector(".menssagem-post");

const editButton = containerposts.querySelector(".edit-button");
editButton.addEventListener("click", (e) => {
e.preventDefault();
containerposts.appendChild(edit(post, menssagem));
});

const postList = document.querySelector("#user-all-posts")

postList.innerHtml += containerposts;
console.log(containertimeLine)

};