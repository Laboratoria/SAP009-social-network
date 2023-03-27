export default () => {
  const signupContainer = document.createElement ('div');
  const signupTemplate = `
<div>
  <h1>SIGN UP</h1>
  <form>
    <div>
      <label for="name">Full Name:</label> 
      <input type="text" id="name"/>
    </div>
    <div>
      <label for="apelido">Username:</label>
      <input type="text" id="username"/>
    </div>
    <div>
      <label for="mail">E-mail:</label>
      <input type="email" id="email"/>
    </div>
    <div>
      <label for="password">Password::</label>
      <input type="senha" id="password"/>
    </div>
    <div class="signup-button">
      <button type="submit">LET'S GO!</button>
    </div>
  </form>
</div>
`;
  signupContainer.innerHTML = signupTemplate;
 

  return signupContainer;

};
