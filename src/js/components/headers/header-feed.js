import { logout } from '../../../firebase/authentication.js';

export default () => {
  const headerFeedContainer = document.createElement('header');
  headerFeedContainer.classList.add('header-feed');

  const headerFeedTemplate = `
<nav id="nav-feed">
    <a href="/#feed"><img src='./img/logo-icon-no-background.png' id="logo-feed" alt="Logo icon to timeline"></a>
    <button aria-label='Open Menu' id="menu-btn" aria-expanded='false'>
        <div id="burger-btn"></div>
    </button>
    <ul id="menu-feed">
        <li class="nav-item"><a class="menu-item" href="#communities">Communities</a></li>
        <li class="nav-item"><a class="menu-item" href="#faq" id="faq">FAQ</a></li>
        <li class="nav-item"><a class="menu-item" href="#about">About Us</a></li>
        <li class="nav-item"><button class="menu-item" type="button" id="logout" class="nav-item">Log out</button></li>
    </ul>
</nav>
    `;

  headerFeedContainer.innerHTML = headerFeedTemplate;
  const headerFeedBtn = headerFeedContainer.querySelector('#menu-btn');
  const signOutBtn = headerFeedContainer.querySelector('#logout');

  // acessibilidade do menu
  function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const navFeed = headerFeedContainer.querySelector('#nav-feed');
    navFeed.classList.toggle('active');
    const active = navFeed.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
      event.currentTarget.setAttribute('aria-label', 'Close Menu');
    } else {
      event.currentTarget.setAttribute('aria-label', 'Open Menu');
    }
  }

  headerFeedBtn.addEventListener('click', toggleMenu);
  headerFeedBtn.addEventListener('touchstart', toggleMenu);

  // colocar promise
  signOutBtn.addEventListener('click', () => {
    logout().then(() => {
      // eslint-disable-next-line no-alert
      alert('You have logged out!');
      window.location.hash = '#home';
    }).catch(() => {
    });
  });

  return headerFeedContainer;
};
