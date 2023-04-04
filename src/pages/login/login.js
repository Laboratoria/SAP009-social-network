import { loginUser, loginGoogle } from '../../lib/api';

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
    <input  id='senha' class='user-login' type='password' required placeholder='Senha'>
    

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
      <button onClick={actionLoginGoogle} id='googleButton'>Google</button>
      <div id="linhaHor2"></div>
    </section>


    </section>
    </section>
   
    </form>
    `;
  container.innerHTML = template;

  const btnLogin = container.querySelector('#submitLogin');
  const email = container.querySelector('#email');
  const password = container.querySelector('#senha');
  const btnGoogle = container.querySelector('#googleButton');

  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    loginGoogle()
      .then(() => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        window.location.hash = '#home';
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Login não foi possível tente novamente.');
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });

  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginUser(email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        // eslint-disable-next-line no-console
        console.log(user);
        window.location.hash = '#home';
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Email ou senha inválidos');
      });
  });

  return container;
};
