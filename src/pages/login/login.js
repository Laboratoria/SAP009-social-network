export default () => {
  const container = document.createElement('div');
  const template = `  
    <p class='logo'>
    <img id='logoImagem' src= 'imagens/logoImagem.jpeg' alt="imagem de um gatinho de óculos e um cachorrinho">
    </p>
    <section class='flex-container'>
    <form class='form'>
    
    <p>E-mail</p>
    <input id='email' class='user-login' type='email' required placeholder='seuemail@dominio.com'>

    <p>Senha</p>
    <input  id='password' class='user-login' type='password' required placeholder='Senha'>
    

    <section class='buttons'>
      <button id='submitLogin'>Login</button>
      <p>
        <a href='#cadastro' class='cadastre'>Cadastre-se</a>
      </p>
    </section>

    <section class='buttons'>
    <a id='submitGoogle' class='btn' href='#login'>Login with</a>
    <section class='buttons'>
      <div id="linhaHor1"></div>
      <button id='googleButton'>Google</button>
      <div id="linhaHor2"></div>
    </section>


    </section>
    </section>
   
    </form>
    `;

  container.innerHTML = template;
  return container;
};