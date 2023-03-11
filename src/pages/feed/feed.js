import {
    criarPost,
    obterPosts
} from "../../firebase/firebase";

export default () => {
    const container = document.createElement('div');
    const template = `
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
                <h2>Seja bem-vindo(a)!</h2>
                <div class="perfil">
                    <div class="tutor">
                        <i class="fa-solid fa-circle-user fa-3x icon-usuário"></i>
                        <p class="texto-feed">@Tutor</p>
                    </div>
                    <div class="cao">
                        <i class="fa-solid fa-paw fa-3x icon-cão"></i>
                        <p class="texto-feed">@Cão</p>
                    </div>
                </div>
                <div class="tela-principal">
                    <div class="logo-tela">
                        <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
                    </div>
                    <div class="div-postagem-tutor">
                        <textarea class="texto-tutor" id="texto-tutor"name="texto-tutor" cols="50" rows="4"></textarea>
                        <button class="btn-publicar" id="btn-publicar">publicar</button>
                    </div>
                        <span id="alertaPublicação" class="alertaPublicação"></span>
                        </div>
                        <div id="postagens" class="postagens"></div>
                        <div id="icones-inferiores">
                            <i class="fa-sharp fa-regular fa-heart icon-coracao"></i>
                            <i class="fa-sharp fa-solid fa-pencil"></i>
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
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

// cria-se uma nova div que contém o valor passado como parâmetro e adiciona essa div à seção com o id "postagens" no documento HTML.
    const exibirPost = (valor) => {
        const posts = document.querySelector('#postagens')
        const container = document.createElement('div');
        const template = `<div class="texto-tutor-postado">${valor}</div>`;
        container.innerHTML = template;
        posts.appendChild(container);
    }
// o código obtém uma lista de posts usando a função "obterPosts" e exibe cada post na página chamando a função "exibirPost" para cada valor resolvido da promessa.
    obterPosts().then(values => {
        values.forEach(value => exibirPost(value))
    })

// o código define um evento de clique para o botão "btnPublicar" que cria um novo post com o texto inserido no campo de texto "texto-tutor". Se a criação do post
// for bem-sucedida, o novo post é exibido na página. Se ocorrer um erro, uma mensagem de erro é exibida. Se o campo de texto estiver vazio, uma mensagem de aviso é exibida.

    const btnPublicar = container.querySelector('#btn-publicar');
    btnPublicar.addEventListener('click', () => {
        const textoTutor = container.querySelector('#texto-tutor');
        const textPost = textoTutor.value;

        if (textPost !== '') {
            criarPost(textPost)
                .then(() => {
                    exibirPost(textPost)
                })
                .catch(() => {
                    alertaPublicação.setAttribute('style', 'display: block');
                    alertaPublicação.innerHTML = 'Ocorreu um erro, tente novamente.';
                });
        } else {
            alertaPublicação.setAttribute('style', 'display: block');
            alertaPublicação.innerHTML = 'Por favor, escreva algo antes de publicar!';
        }
    });

    return container;
};