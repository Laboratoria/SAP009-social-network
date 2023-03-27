export default () => {
  const loginContainer = document.createElement('div');

  const loginScreen = `
  <section id='login-content'
    <section id='background-orange'>
      <h2 id='welcome'> Bem vindo (a) !</h2>
      <p id='quality'> 'A sua qualidade de vida é como um <span>bumerangue</span>, precisa ter movimento. Todas as ações que você lançar, voltarão em sua direção ainda mais fortes.' </p>
      <p id='actions'> Melhore suas ações, pratique atividade física! </p>
      </section>

      <section>
      <figure> <img src='imagens/logo.png' id='login-logo' alt='Logotipo QA- Qualidade de ações'> </figure>
      <input class='padding-inputs' id='email' type='email' placeholder= 'E-MAIL'> </input>
      <input class='padding-inputs' id='password' type='password' placeholder= 'SENHA'> </input>

      <a id= 'enter-button' type='button' href='#feed'> ENTRAR </a>

      <p> ou </p>
      <p> Faça login com sua conta </p> 
      <a href='#feed'> <img src='imagens/google.png' alt='Imagem google' id='image-google'> </a>
      <p> Não tem uma conta? </p> <a href='#register'> CADASTRE-SE </a>
    </section>

    </section>

  <footer>
    <p>© BOOMERANG </p>
  </footer>
 
  `;

  loginContainer.innerHTML = loginScreen;
 //COLOCAR AQUI OS AS MANIPULAÇÕES DINAMICAS DO DOM, PEGANDO OS IDS DO HTML E/OU CSS
  // COLOCAR OS EVENTOS DOS BOTOES DE ENTRAR, ENTRAR C/ GOOGLE E CADASTRAR
  // CRIAR AS CONDICIONAIS SE O EMAIL E/OU SENHA ESTIVEREM ERRADOS, OU SE O EMAIL JÁ FOR OU NÃO CADASTRADO, ETC...
   return loginContainer;
};

