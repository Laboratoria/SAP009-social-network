export function cadastro() {
    const containerCadastro = document.createElement("div");
    containerCadastro.id = "containerCadastro"
    containerCadastro.innerHTML =`
    <form action="/pagina-processa-dados-do-form" method="post">
    <div>
        <label for="nome">Nome:</label>
        <input type="nome" id="nome" name="Nome" />
    </div>
    <div>
        <label for="email">E-mail:</label>
        <input type="email" id="cademail" name="usuario_email" />
    </div>
    <div>
        <label for="senha">Senha:</label>
        <input type="senha" id="cadsenha" name="senha" />
    </div>
    <div>
        <label for="tipo">Você é:</label>
        <input type="tipo" id="tipo" name="tipo" />
     </div>

    <div>
        <label for="msg">Sobre sua família:</label>
        <textarea id="msg" name="usuario_msg"></textarea>
    </div>
   
    <div class="btn">
        <button type="submit">Cadastrar</button>
</div>
</form>`

return containerCadastro
}