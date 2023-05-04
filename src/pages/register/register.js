// import { createUser } from '../../firebase/auth';

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
      <label for="input-date" id="texto_date">Data de nascimento</label>
      <input type="date" name="data" id="data-de-nascimento">
      <input type="cidade-UF" placeholder="cidade-UF">
      <label for="input-curvatura" id="texto_curvatura">Qual a curvatura dos seus cachos?</label>
      <input type="curvatura-2abc-3abc-4abc" placeholder="2abc/3abc/4abc">
      <input type="email" placeholder="Email" id="email_register">
      <input type="senha" placeholder="Senha" id="password_register">
      <input type="cofirmar-a-senha" placeholder="confirme a senha" id="confirm_password">
      <input type="button" value="cadastrar" id="button_register">
    </form>
    </section>
    `;
  containerRegister.innerHTML = registerScreen;
  // const inputName = containerRegister.querySelector('#name_register');
  // const inputEmail = containerRegister.querySelector('#email_register');
  // const inputPassword = containerRegister.querySelector('#password_register');
  // const inputConfirmPassword = containerRegister.querySelector('#confirm-password');

  /* const cadastro = containerRegister.querySelector('#button_register');
  cadastro.addEventListener('click', (e) => {
    e.preventDefault();
    createUser(inputEmail.value, inputPassword.value);
  }); */

  return containerRegister;
};
