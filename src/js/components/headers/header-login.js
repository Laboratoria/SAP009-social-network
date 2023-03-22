export default () => {
  const headerLoginContainer = document.createElement('div');
  headerLoginContainer.classList.add('header-login');

  const headerLoginTemplate = `
     <header>
        <div class="header-nav">
          <ul>
            <li id="header-link">
              <a href="/#"><img src="./img/logo-icon-no-background.png" alt="logo-icon" id="logo-icon"></a>
            </li>
            <li id="li-header-btn">
              <button href="/#login" id="header-btn">SIGN UP</button>
            </li>
          </ul>
        </div>
      </header>
      `;

  headerLoginContainer.innerHTML = headerLoginTemplate;

  return headerLoginContainer;
};