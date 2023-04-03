export default () => {
  const container = document.createElement('div');
  const templaite = `
  
  <header class='header-login-page'>
  <p1>HelParents</p1>
</header>


 <p1>A HelParents é uma rede social para você que é cuidador ou 
  responsável por alguma criança e/ou adolescente e busca 
  um espaço seguro para o compartilhamento de informações 
  e orientações  sobre o uso da internet e seus aplicativos por esse público. </p1>

            <p1>Já está cadastrado ? Faça o login!</p1>

        <form class='section-login-dispay'>

        <br>

    <h1> LOGIN </h1>
    <div class="row align-items-center h-100 ">
    <div class="col-8 col-md-3 col-xs-8 mx-auto l-form">
        <form class="form" method="post">
            <div class="form-group ">
                <input type="text" placeholder="Usuário" class="form-control i-form">
            </div>
            <div class="form-group">
                <input type="password" placeholder="Senha" class="form-control i-form">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-dark btn-md btn-block">LOGIN</button>
                <br>
                <p1>Acesse com o Google<p1>
                <br>
                <button type="submit" class="btn btn-dark btn-md btn-block">GOOGLE</button>
                <br>
                <p1> Ainda não tem conta?<p1>
                <br>
                <button type="submit" class="btn btn-dark btn-md btn-block">CADASTRE-SE</button>
                </div>
        </form>
    </div>
</div>
   
    
`;

  container.innerHTML = templaite;
  return container;
};