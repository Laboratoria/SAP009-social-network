export default () => {
  const headerLoginContainer = document.createElement('div');
  headerLoginContainer.classList.add('header-login');

  const headerLoginTemplate = `
  <div class="header-nav">
    <ul>
      <li id="header-link">
        <a href="/#home"><img src="./img/logo-icon-no-background.png" alt="logo-icon" id="logo-icon"></a>
      </li>
      <li id="li-header-btn">
        <button id="header-btn">
          <a href="/#signup">SIGN UP</a>
        </button>
      </li>
    </ul>
  </div>
   `;

  headerLoginContainer.innerHTML = headerLoginTemplate;

  return headerLoginContainer;
};
