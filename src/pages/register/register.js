import { createUser } from '../../firebase/auth';
import { getErrors } from '../../firebase/erros';

export default () => {
  const containerRegister = document.createElement('div');

  const registerScreen = `
    <section>
    <header>
    <img src="imagens/duas-mulheres-pagina-de-cadastro.png" alt="duas-mulheres-negras" id="img_register">
    <h1>Quer as melhores dicas para cuidar dos seus cachos? Vem com a gente!</h1></header>
    <form action="formulario-de-cadastro" id="form_register">
      <input type="name" placeholder="Nome" id="name_register">
      <input type="sobrenome" placeholder="sobrenome">
      <label for="input-curvatura" id="texto_curvatura">Qual a curvatura dos seus cachos?</label>
      <input type="curvatura-2abc-3abc-4abc" placeholder="2abc/3abc/4abc">
      <input type="email" placeholder="Email" id="email_register">
      <input type="password" placeholder="Senha" id="password_register">
      <input type="password" placeholder="confirme a senha" id="confirmar_a_senha">
      <input type="button" value="cadastrar" id="button_register">
      <p id='error-register'> </p>
      <p id='confirmation-message'> </p> <br>
    </form>
    </section>
    `;
  containerRegister.innerHTML = registerScreen;
  const inputName = containerRegister.querySelector('#name_register');
  const inputEmail = containerRegister.querySelector('#email_register');
  const inputPassword = containerRegister.querySelector('#password_register');
  const inputConfirmPassword = containerRegister.querySelector('#confirmar_a_senha');
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
