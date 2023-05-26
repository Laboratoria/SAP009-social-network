import { creatPost, deletePost, getPosts } from '../../lib/firebase-firestone.js';

export function timeline() {
  const containertimeLine = document.createElement('div');
  containertimeLine.id = 'containertimeLine';
  containertimeLine.innerHTML = ` 
  <button id="logout">Sair</button>    
    <h2>O QUE ESTÁ PENSANDO?</h2>
    <form action='/pagina-processa-dados-do-form' method='post'>
    <div id='new-post' class='section-new-post'>
      <div class='new-post'>
        <form class='form-post'>
          
          <textarea name='textarea' id='menssagemtime' class='new-post-menssagemtime' placeholder='post'></textarea>
          <span id='error-msg' class='error-msg'></span>
          <div class='buttons-post-delete'>
            <button id='post-button' class='post-button'>postar</button>
            <button id='delete-button' class='delete-button'>excluir</button>
          </div>  
        </form>
      </div>
    </div>

    <div class='posts-containertimeLine'>
      <ul id='user-all-posts' class='ul-posts'></ul>
    </div>
    <div id='posts-templates'></div>
    `;
  const registerButton = containertimeLine.querySelector('#logout');
  registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'login';
  });

  const menssagemtime = containertimeLine.querySelector('#menssagemtime');

  // Função para mandar os dados da nova postagem para o Clound Firestore
  const postButton = containertimeLine.querySelector('#post-button');
  postButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (menssagemtime.value) {
      creatPost(menssagemtime.value);
      menssagemtime.value = '';
    } else {
      window.alert('Por favor digitar a mensagem');
    }
  });

  // Quando clicar no botão excluir da nova postagem, antes de enviar, o campo fique limpo
  const deleteButton = containertimeLine.querySelector('#delete-button');
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    menssagemtime.value = '';
  });

  getPosts();

  return containertimeLine;
}

export function posts(element) {
  const containertimeLine = document.querySelector('#containertimeLine');
  const containerPosts = containertimeLine.querySelector('#posts-templates');
  containerPosts.innerHTML += `
      <div class='section-post-published'>
        <p class='username-post'>${element.userName}</p>
        <p class='date-post'>${element.data.toDate().toLocaleDateString()}</p>
        <p class='menssagem-post'>${element.menssagem}</p>
        <div class='container-like'>
          <div class='buttons-edit-delete'>
          <button class='edit-button'>editar</button>
          <button class='post-delete-button'>excluir</button>
        </div>
        <span class='error-edit'></span>
      </div>
           
    `;
}
