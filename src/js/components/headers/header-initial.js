export default () => {
  const headerInitialContainer = document.createElement('header');
  headerInitialContainer.classList.add('header-initial');

  const headerInitialTemplate = `
<div class="header-nav">
  <ul>
    <li id="header-link">
      <a href="/#"><img src="./img/logo-icon-no-background.png" alt="logo-icon" id="logo-icon"></a>
    </li>
    <li id="li-header-btn">
      <button href="/#login" id="header-btn">SIGN IN</button>
    </li>
  </ul>
</div>
  `;

  headerInitialContainer.innerHTML = headerInitialTemplate;

  return headerInitialContainer;
};
