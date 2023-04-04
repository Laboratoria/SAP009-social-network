export default () => {
  const signupContainer = document.createElement('div');
  const signupTemplate = `
  <form class="form-signup">
    <h1 class="signup-h1">SIGN UP</h1>
    <div class="signup-group">
      <label for="name">Full Name:</label> 
      <input type="text" id="name"/>
      <div class="error" id="no-name-error">Please, enter your full name.</div>
    </div>
    <div class="signup-group">
      <label for="apelido">Username:</label>
      <input type="text" id="username"/>
      <div class="error" id="no-username-error">Please, enter your username.</div>
      <div class="error" id="username-length-error">Your username must have between 6 and 10 characters.</div>
    </div>
    <div class="signup-group">
      <label for="mail">E-mail:</label>
      <input type="email" id="email"/>
      <div class="error" id="no-email-error">Please, enter your email.</div>
      <div class="error" id="invalid-email-error">Invalid email.</div>
    </div>
    <div class="signup-group">
      <label for="password">Password:</label>
      <input type="password" id="password"/>
      <div class="error" id="no-password-error">Please, enter your password.</div>
      <div class="error" id="short-password-error">Your password is too short.</div>
    </div>
    <div class="signup-group">
      <label for="passwordConfirmation">Password Confirmation:</label>
      <input type="password" id="password-confirmation"/>
      <div class="error" id="no-password-confirmation-error">Please, enter your password confirmation.</div>
      <div class="error" id="passwords-dont-match-error">Passwords don't match.</div>
    </div>
    <div class="signup-button">
      <button id="signup-btn" type="submit">LET'S GO!</button>
    </div>
  </form>

`;
  signupContainer.innerHTML = signupTemplate;

  const name = signupContainer.querySelector('#name');
  const username = signupContainer.querySelector('#username');
  const email = signupContainer.querySelector('#email');
  const password = signupContainer.querySelector('#password');
  const passwordConfirmation = signupContainer.querySelector('#password-confirmation');
  const registerBtn = signupContainer.querySelector('#signup-btn');

  const noNameError = signupContainer.querySelector('#no-name-error');
  const noUsernameError = signupContainer.querySelector('#no-username-error');
  const usernameLengthError = signupContainer.querySelector('#username-length-error');
  const noEmailError = signupContainer.querySelector('#no-email-error');
  const invalidEmailError = signupContainer.querySelector('#invalid-email-error');
  const noPasswordError = signupContainer.querySelector('#no-password-error');
  const shortPasswordError = signupContainer.querySelector('#short-password-error');
  const noPasswordConfirmationError = signupContainer.querySelector('#no-password-confirmation-error');
  const passwordsDontMatch = signupContainer.querySelector('#passwords-dont-match-error');

  function validateEmail(value) {
    return /\S+@\S+\.\S+/.test(value);
  }

  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // name validation
    if (name.value === '' || name.value.length < 8) {
      noNameError.style.display = 'block';
    } else {
      noNameError.style.display = 'none';
    }

    // username validation
    if (username.value === '') {
      noUsernameError.style.display = 'block';
    } else if (username.value.length < 6 || username.value.length > 10) {
      noUsernameError.style.display = 'none';
      usernameLengthError.style.display = 'block';
    } else {
      noUsernameError.style.display = 'none';
      usernameLengthError.style.display = 'none';
    }

    // email validation
    if (email.value === '') {
      noEmailError.style.display = 'block';
    } else if (!validateEmail(email.value)) {
      noEmailError.style.display = 'none';
      invalidEmailError.style.display = 'block';
    } else {
      noEmailError.style.display = 'none';
      invalidEmailError.style.display = 'none';
    }

    // password validation
    if (password.value === '') {
      noPasswordError.style.display = 'block';
    } else if (password.value.length < 6) {
      noPasswordError.style.display = 'none';
      shortPasswordError.style.display = 'block';
    } else {
      noPasswordError.style.display = 'none';
      shortPasswordError.style.display = 'none';
    }

    // password confirmation validation
    if (passwordConfirmation.value === '') {
      noPasswordConfirmationError.style.display = 'block';
    } else if (passwordConfirmation.value !== password.value) {
      noPasswordConfirmationError.style.display = 'none';
      passwordsDontMatch.style.display = 'block';
    } else {
      noPasswordConfirmationError.style.display = 'none';
      passwordsDontMatch.style.display = 'none';
    }
  });

  return signupContainer;
};

/* export function signUpButton() {
  firebase.auth().createUserwithEmailandPassword
  (document.getElementById('email').value, document.getElementById('password').value)
    .then((user) => {
      const auth = user;
      alert('Seus dados foram cadastrados com sucesso');

      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
    }).catch((error) => {
      alert('Falha ao cadastrar');
    });
}
 */
