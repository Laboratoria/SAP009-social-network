// import header from '../../components/header/index.js';
import { createUser } from '../../servicesFirebase/firebaseAuth.js';
import { userData } from '../../servicesFirebase/firebaseStore.js';
// import {changeName } from '../../components/header/index.js' ;

export default () => {
  const loginContainer = document.createElement('div');
  loginContainer.classList.add('login-container');

  const content = `
    
    <header class='header-login display' >
        <img src='./imagens/logo3.png' alt='logo-code-girls' class='logo-code-girls'>
        <p> CONECTANDO MULHERES NA TECNOLOGIA </p>
    </header>
    <form class='section-login section-register display'>
        <h1> CADASTRE-SE </h1>
        <input type='text' placeholder='Nome' id='nome-fulana'>
        <input type='text' placeholder='Sobrenome' id='sobrenome-fulana'>
        <input type='text' placeholder='Usuário' id='usuario-fulana'>
        <input type='email' placeholder='Email' id='email-cadastro'>
        <input type='password' placeholder='Senha' id='senha-cadastro'>           
        <button class='button-login' id='cadastro-firebase' type='button' > CADASTRAR </button>    
        
    </form>
    `;
  loginContainer.innerHTML = content;

  const register = loginContainer.querySelector('#cadastro-firebase');
  register.addEventListener('click', () => {
    const email = loginContainer.querySelector('#email-cadastro');
    const senha = loginContainer.querySelector('#senha-cadastro');
    // const name = loginContainer.querySelector('#nome-fulana');
    // changeName(name.value)
    const nome = loginContainer.querySelector('#nome-fulana');
    const sobrenome = loginContainer.querySelector('#sobrenome-fulana');
    const usuario = loginContainer.querySelector('#usuario-fulana');
    const emailfulana = loginContainer.querySelector('#email-cadastro');

    userData(nome.value, sobrenome.value, usuario.value, emailfulana.value);

    createUser(email.value, senha.value, nome.value, sobrenome.value, usuario.value)
      .then(() => {
        window.location.hash = '#Home';
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // eslint-disable-next-line no-console, no-alert
        alert('Erro ao cadastrar usuário!');
        // eslint-disable-next-line no-console
        console.error(error);
        // ..
      });

    // console.log(email.value, senha.value);
    // alert('ok!');
  });

  return loginContainer;
};
