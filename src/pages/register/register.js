import { createUser } from '../../firebase/auth';
import { getErrors } from '../../firebase/erros';

export default () => {
  const containerRegister = document.createElement('div');

  const registerScreen = `
    <section>
    <header class="container_register">
    <img src="imagens/duas-mulheres-pagina-de-cadastro.png" alt="duas-mulheres-negras" id="img_register" 
     class='container_img'>
    <img src="imagens/Quer as melhores dicas para cuidar dos seus cachos_ Vem com a gente!.svg" 
     alt="Quer as melhores dicas para cuidar dos seus cachos_ Vem com a gente!" id="img_text" class='container_img'>
    </header>
    <form action="formulario-de-cadastro" id="form_register">
      <input type="name" placeholder="Nome" id="nome_register">
      <input type="sobrenome" placeholder="sobrenome" id="sobrenome_register">
      <div class="container_curvatura">
        <label for="input-curvatura" id="texto_curvatura">Qual a curvatura dos seus cachos?</label>
        <input type="curvatura-2abc-3abc-4abc" placeholder="2abc/3abc/4abc" id="input_curvatura">
      </div>
      <input type="email" placeholder="Email" id="email_register">
      <input type="password" placeholder="Senha" id="password_register">
      <input type="password" placeholder="confirme a senha" id="confirm_password">
      <input type="button" value="cadastrar" id="button_register">
      <p id='error-register'> </p>
      <p id='confirmation-message'> </p> <br>
    </form>
    </section>
    <footer><img src="imagens/connectCurls (2) 1.png" alt="cachinho" id="cachinho_footer"></footer>
    `;
  containerRegister.innerHTML = registerScreen;
  const inputName = containerRegister.querySelector('#name_register');
  const inputEmail = containerRegister.querySelector('#email_register');
  const inputPassword = containerRegister.querySelector('#password_register');
  const inputConfirmPassword = containerRegister.querySelector('#confirm_password');
  const errorMessage = containerRegister.querySelector('#error-register');
  const confirmationMessage = containerRegister.querySelector('#confirmation-message');

  const cadastro = containerRegister.querySelector('#button_register');
  cadastro.addEventListener('click', (e) => {
    e.preventDefault();
    createUser(inputEmail.value, inputPassword.value, inputConfirmPassword.value)
      .then(() => {
        confirmationMessage.innerHTML = `OLÁ ${inputName.value}! <br> <strong> SEU CADASTRO FOI REALIZADO! </strong><br> Agora, faça o <a href="/#login">LOGIN</a> para navegar!`;
      })
      .catch((error) => {
        errorMessage.innerHTML = getErrors(error);
      });
  });

  return containerRegister;
};
