export default () => {
  const container = document.createElement('div');

  const template = `
  <div class="container-login">
        <div class="img-box">
            <img src="img/login.svg">
        </div>
        <div class="content-box">        
            <div class="form-box">
            <p>Para fazer parte dessa comunidade você precisa estar logado</p>
               
                <form>
                    <div class="input-box">
                        <span>Digite seu e-mail</span>
                        <input type="email" placeholder="@mail.com">
                    </div>

                    <div class="input-box">
                        <span>Digite sua senha</span>
                        <input type="password" placeholder="password">
                    </div>

                    <!-- <div class="remember">
                        <label>
                            <input type="checkbox"> Remember me
                        </label>
                        <a href="#">Esqueceu a Senha?</a>
                    </div> -->

                    <div class="input-box">
                        <input type="submit" value="Entrar">
                    </div>

                    <div class="input-box">
                       <p>Não Tem Uma Conta? <a href="#">Inscrever-se</a></p>
                    </div>
                </form>
                <div class="box-google">
                <h4>Ou se preferir, você pode logar com</h4>
                <ul class="ul">
                    <li><img src="img/facebook.png"></li>
                    <li><img src="img/google.png"></li>
                    <li><img src="img/apple.png"></li>
                </ul>
                </div>
            </div>
        </div>
    </div>
`;

  container.innerHTML = template;
  return container;
};
