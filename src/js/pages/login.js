import authentication from src/firebase/authentication.js

export default () => {
  const loginContainer = document.createElement('section');
  loginContainer.classList.add('login-section');

  const loginTemplate = `
<form class="form-login" action="">
  <div class="card-login">
    <div class="card-top">
      <img class="logo-login" src="img/logo-s2s-transparent.png" alt="Logo image">
      <h1>LOGIN</h1>
    </div>
    <div class="input-group">
      <label>Email:</label>
      <input type="email" id="email-login" name="email" placeholder="Type your email">
      <div class="error" id="no-email-error">Please, enter your email.</div>
      <div class="error" id="invalid-email-error">Invalid email.</div>
    </div>
    <div class="input-group">
      <label>Password:</label>
      <input type="password" id="password-login" name="password" placeholder="Type your password">
      <div class="error" id="no-password-error">Please, enter your password.</div>
      <div class="error" id="short-password-error">Your password is too short.</div>
    </div>
    <div class="login-links">
      <button type="button" id="recover-password">
        <a href="">Click here if you forgot your password.</a>
      </button>
    </div>
    <div id="button-login">  
      <button type="submit" id="login-btn">LET'S GO!</button>
    </div>
    <div class="login-links">
      <a href="/#signup">Click here if you still don't have an account.</a>
    </div>
    <div class="separation-or">
      <hr>
      <h2>OR</h2>
      <hr>
    </div>
    <div class="btn-group">
      <button class="login-google">
        <span>
         <img id="logo-google" src="./img/google-37.png" alt="google">
         Sign in with Google
        </span>
      </button>
    </div>
  </div>
</form>  
  `;

  loginContainer.innerHTML = loginTemplate;
  /*   const formLogin = loginContainer.querySelector('.form-login'); */
  const emailLogin = loginContainer.querySelector('#email-login');
  const passwordLogin = loginContainer.querySelector('#password-login');
  const loginBtn = loginContainer.querySelector('#login-btn');
  const noEmailError = loginContainer.querySelector('#no-email-error');
  const invalidEmailError = loginContainer.querySelector('#invalid-email-error');
  const noPasswordError = loginContainer.querySelector('#no-password-error');
  const shortPasswordError = loginContainer.querySelector('#short-password-error');

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (emailLogin.value === '') {
      noEmailError.style.display = 'block';
    } else if (!validateEmail(emailLogin.value)) {
      noEmailError.style.display = 'none';
      invalidEmailError.style.display = 'block';
    } else {
      noEmailError.style.display = 'none';
      invalidEmailError.style.display = 'none';
    }

    if (passwordLogin.value === '') {
      noPasswordError.style.display = 'block';
    } else if (passwordLogin.value.length < 6) {
      noPasswordError.style.display = 'none';
      shortPasswordError.style.display = 'block';
    } else {
      noPasswordError.style.display = 'none';
      shortPasswordError.style.display = 'none';
    }

  /*     window.location.hash = '#feed'; */
  });

  return loginContainer;
};
