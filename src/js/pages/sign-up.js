export default () => {
  const signupContainer = document.createElement ('div');
  const signupTemplate = `
  <form class="form-signup">
    <h1 class="signup-h1">SIGN UP</h1>
    <div class="signup-group">
      <label for="name">Full Name:</label> 
      <input type="text" id="name"/>
    </div>
    <div class="signup-group">
      <label for="apelido">Username:</label>
      <input type="text" id="username"/>
    </div>
    <div class="signup-group">
      <label for="mail">E-mail:</label>
      <input type="email" id="email"/>
    </div>
    <div class="signup-group">
      <label for="password">Password:</label>
      <input type="senha" id="password"/>
    </div>
    <div class="signup-group">
      <label for="passwordConfirmation">Password Confirmation:</label>
      <input type="senha" id="password-confirmation"/>
    </div>
    <div class="signup-button">
      <button id="signup-botao" type="submit">LET'S GO!</button>
    </div>
  </form>

`;
  signupContainer.innerHTML = signupTemplate;

  return signupContainer;
};
