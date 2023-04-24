import logo from '../../../img/logo-icon-no-background.png';

export default () => {
  const headerInitialContainer = document.createElement('header');
  headerInitialContainer.classList.add('header-initial');

  const headerInitialTemplate = `
<div class="header-nav">
  <ul>
    <li id="header-link">
      <a href="/#home"><img src="${logo}" alt="Logo Icon to Home" id="logo-icon"></a>
    </li>
    <li id="li-header-btn">
      <button id="header-btn">
       <a href="/#login">SIGN IN</a>
      </button>
    </li>
  </ul>
</div>
  `;

  headerInitialContainer.innerHTML = headerInitialTemplate;
  const headerInitialBtn = headerInitialContainer.querySelector('#header-btn');

  headerInitialBtn.addEventListener('click', () => {
    window.location.hash = '#login';
  });

  return headerInitialContainer;
};
