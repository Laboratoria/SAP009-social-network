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
        <li class="nav-item"><a href="#communities">Communities</a></li>
        <li class="nav-item"><a href="#faq" id="faq">FAQ</a></li>
        <li class="nav-item"><a href="#about">About Us</a></li>
        <li class="nav-item"><a href="#login" id="logout">Log out</a></li>
    </ul>
</nav>
    <img id="user-img" alt="User">
    `;

  headerFeedContainer.innerHTML = headerFeedTemplate;
  const headerFeedBtn = headerFeedContainer.querySelector('#menu-btn');

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

  return headerFeedContainer;
};
