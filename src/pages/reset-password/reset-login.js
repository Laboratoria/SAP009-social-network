//export default () => {
    const inputReset = document.querySelector("#esqueci");
    inputReset.addEventListener('click', function() {
        const resetPassaword = document.getElementById('main-login');
        const template = `
        <button class="back"><a href="index.html">Voltar</a></button>
        <div class="ontop-login">
        <img src="./img/logo/logo.png" alt="logo-dogTips">
    </div>
        <div class="card-login">
        <div class="login">
            <form>
            <label for="reset-passaword">Para redefinir sua senha, informe o endereço de e-mail cadastrado: </label>
             <input type="email" id="email" name="email" placeholder="name@hotmail.com">
            <button type="submit" class="reset">Redefinir senha</button>
        </form>
          </div>
    </div>
    <p id="text-confirm-reset"></p>
        `
        resetPassaword.innerHTML = template;

        const buttonReset = document.querySelector(".reset");
        buttonReset.addEventListener('click', function(e) {
            e.preventDefault();
    const textReset = document.querySelector("#text-confirm-reset");
    textReset.innerHTML="Em breve, você receberá um e-mail com todas as instruções para redefinir sua senha."
        }
        );
    }
    );
   

//}