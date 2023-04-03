export default () => {
  const container = document.createElement('div');
  const template = `
  <header class='header-login-page'>
    <h1 class="logo-geral">HelParents</h1>
  </header>
  <div class="paragrafo">
    <p>A HelParents é uma rede social para você que é cuidador ou 
  responsável por alguma criança e/ou adolescente e busca 
  um espaço seguro para o compartilhamento de informações 
  e orientações  sobre o uso da internet e seus aplicativos por esse público.</p>
    <p><strong>Já está cadastrado? Faça o login!</strong></p>
  </div>  
  <form class='section-login'>
      <h2>LOGIN</h2>
      <input type='text' placeholder='Usuário' id='name'>
      <input type='password' placeholder='Senha' id='password'> 
      <div class="form-group">
            <button type="submit" class="btn-feed">LOGIN</button>
                <p>Acesse com o Google<p>
            <button type="submit" class="btn-login">GOOGLE</button>
                <p> Ainda não tem conta?<p>
                <button type="submit" class="btn-cadastro btn-geral">CADASTRE-SE</button>
        </div>
    </form> 
  `;

  container.innerHTML = template;
  const btnLogin = container.querySelector('.btn-feed');
  btnLogin.addEventListener('click', () => {
    window.location.hash = '#feed';
  });
  return container;
};
