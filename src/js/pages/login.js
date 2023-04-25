import { loginToFeed, loginWithGoogle, resetPassword } from '../../firebase/authentication.js';
import { errorLogin } from '../../firebase/error.js';

import logoComplete from '../../img/logo-s2s-transparent.png';
import logoGoogle from '../../img/google-37.png';

export default () => {
  const loginContainer = document.createElement('section');
  loginContainer.classList.add('login-section');

  const loginTemplate = `
<form class="form-login" action="">
  <div class="card-login">
    <div class="card-top">
      <img class="logo-login" src="${logoComplete}" alt="Logo image">
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
      <button type="button" name="password-reset" id="reset-password-btn">
        Click here if you forgot your password.
      </button>
      <div id="reset-password-error"></div>
    </div>
    <div id="button-login">  
      <button type="submit" id="login-btn">LET'S GO!</button>
      <div id="error-login"></div>
    </div>
    <div class="login-links">
      <a href="/#signup">Click here if you still don't have an account.</a>
    </div>
  </div>
  <div class="login-with-google">
    <div class="separation-or">
      <hr>
      <h2>OR</h2>
      <hr>
    </div>
    <div class="btn-group">
      <button class="login-google">
        <span>
         <img id="logo-google" src="${logoGoogle}" alt="google">
         Sign in with Google
        </span>
      </button>
    </div>
  </div>
</form>  
  `;

  loginContainer.innerHTML = loginTemplate;
  const formLogin = loginContainer.querySelector('.form-login');
  const emailLogin = loginContainer.querySelector('#email-login');
  const passwordLogin = loginContainer.querySelector('#password-login');
  const loginBtn = loginContainer.querySelector('#login-btn');
  const resetPasswordBtn = loginContainer.querySelector('#reset-password-btn');
  const resetPasswordError = loginContainer.querySelector('#reset-password-error');
  const loginWithGoogleBtn = loginContainer.querySelector('.login-google');
  const noEmailError = loginContainer.querySelector('#no-email-error');
  const invalidEmailError = loginContainer.querySelector('#invalid-email-error');
  const noPasswordError = loginContainer.querySelector('#no-password-error');
  const shortPasswordError = loginContainer.querySelector('#short-password-error');
  const errorLoginMessage = loginContainer.querySelector('#error-login');

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formLogin.reportValidity();
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

    loginToFeed(emailLogin.value, passwordLogin.value)
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => {
        errorLoginMessage.innerHTML = errorLogin(error);
      });
  });

  resetPasswordBtn.addEventListener('click', () => {
    resetPassword(emailLogin.value)
      .then(() => {
        resetPasswordError.innerHTML = 'Check your inbox to reset your password.';
      })
      .catch((error) => {
        resetPasswordError.innerHTML = errorLogin(error);
      });
  });

  loginWithGoogleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginWithGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch(() => {
      });
  });
  return loginContainer;
};
