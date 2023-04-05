export default ()=> {
    const container=document.createElement('div');
     container.classList.add('container-cadastro');
    
    const template=`
     <img class = "icon-1" src="image/Rectangle 86.png" alt="imagem de menina lavando o rosto">
     <section class = "bloco-cadastro"> 
        <header> 
        <h3> Bem vindo á C&H </h3> 
        <h1> Cadastre-se </h1>
        </header>
    
        <form class = "form-cadastro"> 
            <div> 
            <label> Email </label> 
            <input type = "text" name= "username" id="username"
            placeholder = "Digite seu email"> 
            </div>
            <div> 
            <label> Nome </label> 
            <input type = "text" name= "username" id="name"
            placeholder = "Seu nome"> 
            </div><label> Número </label> 
            <input type = "number" name= "username" id="number"
            placeholder = "Seu número"> 
            </div><label> Senha </label> 
            <input type = "password" name= "username" id="password"
            placeholder = "Senha"> 
            </div>
            <div>
            <button> Cadastrar </button>
            </div>
        </form>
       
     </section>
     <img class = "icon-1" src="image/Rectangle 83.png" alt="imagem de menina mexendo no cabelo">
     
     `;
     container.innerHTML = template;
    return container;
    
    }