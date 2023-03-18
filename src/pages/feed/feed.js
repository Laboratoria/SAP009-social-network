import {
    criarPost,
    obterPosts,
    obterNomeUsuario,
    deletarPost,
} from "../../firebase/firebase";

export default async () => {
    const usuarioLogado = await obterNomeUsuario();
    console.log('usuario', usuarioLogado.uid)
    const container = document.createElement('div');
    const template = `
    <div class="feed-desktop>"
        <div class="main">
            <div class="barra-feed">
                <i class="fa-solid fa-bars fa-2x icon-menu" id="burguer"></i>
                <menu id="itens">
                    <ul>
                        <li><a href="#">feed</a></li>
                        <li><a href="#">perfil</a></li>
                        <li><a href="#">sobre</a></li>
                        <li><a href="#">sair</a></li>
                    </ul>
                </menu>
                <div class="info-usuario">
                <h2>Seja bem-vindo(a)!</h2>
                <div class="perfil">
                    <div class="tutor">
                        <i class="fa-solid fa-circle-user fa-3x icon-usuário"></i>
                        <p class="texto-feed">@${usuarioLogado.displayName}</p>
                    </div>
                    <div class="cao">
                        <i class="fa-solid fa-paw fa-3x icon-cão"></i>
                        <p class="texto-feed">@Cao</p>
                    </div>
                </div>    
                </div>
            </div>
                <div class="tela-principal">
                    <div class="logo-tela-feed">
                        <img src="./img/logo/logo.png" class="img-logo-feed" alt="logo-dogTips">
                    </div>
                    <div class="div-postagem-tutor">
                        <textarea class="texto-tutor" id="texto-tutor"name="texto-tutor" cols="50" rows="4" ></textarea>
                        <button class="btn-publicar" id="btn-publicar">publicar</button>
                    </div>
                        <span id="alertaPublicação" class="alertaPublicação"></span>
                        </div>
                        <div id="postagens" class="postagens"></div>
                </div>
        </div>
    </div>
        `;
    container.innerHTML = template;

    const iconeMenu = container.querySelector('#burguer');
    iconeMenu.addEventListener('click', () => {
        const itens = container.querySelector('#itens');
        if (itens.style.display === 'block') {
            itens.style.display = 'none';
        } else {
            itens.style.display = 'block';
        }
    });

    const exibirPost = (post) => {
        const posts = document.querySelector('#postagens');
        const container = document.createElement('div');
        console.log('posti', post.author)
        const template = `
          <div class="div-postagem-anteriores-tutor">
            <div id="icone-superiores">
              <i class="fa-solid fa-circle-user fa-2x icon-usuario-txt"></i>
              <p class="tutor-txt-area">${post.nomeTutor}</p>
              <p class="data-postagem">${post.data}</p>
            </div>
            <div class="texto-tutor-postado">${post.texto}</div>
            <div id="icones-inferiores">
              <i class="fa-solid fa-paw"></i>
              <i class="fa-sharp fa-solid fa-pencil"></i>
              ${post.author === usuarioLogado.uid ? `
                <button class="btn-deletar">
                  <i class="fa-solid fa-trash-can" id="btn-deletar" type="button"></i>
                </button>
              ` : ''}
            <div class="caixa-deletar" id="caixa-deletar-${post.id}">
                <div class="modal">
                    <p class="txt-excluir">Tem certeza que deseja excluir?</p>
                    <div class="btn-caixa">
                        <button class="btn-excluir" id='btn-excluir'>Excluir</button>
                        <button class="btn-cancelar" id="btn-cancelar">Cancelar</button>
                    </div>
                </div>
            </div>
          </div>
        `;
        container.innerHTML = template;
        posts.appendChild(container);
        
        if (post.author === usuarioLogado.uid) {
            const btnDeletar = container.querySelector('#btn-deletar');
            btnDeletar.addEventListener('click', () => {
                const modal = document.getElementById(`caixa-deletar-${post.id}`);
                modal.style.display = 'block';

            const btnCancelar = modal.querySelector('#btn-cancelar');
            btnCancelar.addEventListener('click', () => {
                modal.style.display = 'none';
            }); 

            const btnExcluir = modal.querySelector('#btn-excluir');
            btnExcluir.addEventListener('click', () => {
                deletarPost(post.id);
                container.remove();
                modal.style.display = 'none';
            });
        }); 
        };
        // para disparar a caixa modal 
        // const btnDeletar = container.querySelector('#btn-deletar');
        // const caixaDeletar = container.querySelector('#caixa-deletar');
        
        // if (post.author === usuarioLogado.uid) {
        //   if (btnDeletar) {
        //     btnDeletar.addEventListener('click', () => {
        //         caixaDeletar.style.display = 'flex';
        //     })
        //   }

        //   // para fechar a caixa modal 
        //   const btnCancelar = container.querySelector('#btn-cancelar');
        //   if (btnCancelar) {
        //     btnCancelar.addEventListener('click', () => {
        //         caixaDeletar.style.display = 'none';
        //     })
        //   }

        //   // para deletar post
        //   btnDeletar.addEventListener('click', () => {
        //     deletarPost(post.id);
        //     container.remove(); // removendo a postagem da interface após excluí-la do banco de dados
        //   });
        // }
      };

      obterPosts().then(posts => {
        postagens.innerHTML = '';
        posts.forEach(post => exibirPost(post));
      });

    // o código define um evento de clique para o botão "btnPublicar" que cria um novo post com o texto inserido no campo de texto "texto-tutor". Se a criação do post
    // for bem-sucedida, o novo post é exibido na página. Se ocorrer um erro, uma mensagem de erro é exibida. Se o campo de texto estiver vazio, uma mensagem de aviso é exibida.
    const btnPublicar = container.querySelector('#btn-publicar');
    btnPublicar.addEventListener('click', async () => {
        const textoTutor = container.querySelector('#texto-tutor');
        const textPost = textoTutor.value;

        if (textPost !== '') {
            try {
                const novoPost = await criarPost(textPost);
                // espera o criarPost e dps exibe o post
                exibirPost(novoPost);
                console.log(novoPost);
                textoTutor.value = '';
            } catch (error) {
                alertaPublicação.setAttribute('style', 'display: block');
                alertaPublicação.innerHTML = 'Ocorreu um erro, tente novamente.';
            }
        } else {
            alertaPublicação.setAttribute('style', 'display: block');
            alertaPublicação.innerHTML = 'Por favor, escreva algo antes de publicar!';
        }
    });


    return container;
};