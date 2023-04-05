import {auth, LogOut} from './../firebase/auth';

export default () => {
  const headerContent = document.createElement('header');


  const template = `     
    <div class="div-logo-timeline">
      <img src="./assets/logo-horizontal.png" id="ada-logo-timeline" class="logo-image-timeline" alt="logo da ConectAda">
    </div>
    <nav role="navigation">
    <div id="menuToggle">
     
      <input type="checkbox" />
      
     
      <span></span>
      <span></span>
      <span></span>
      
     
      <ul id="menu">
      <li><a href="#">Home</a></li>
      <li><a href="#">Sobre</a></li>
      <li><a id="menu-sair" href="#">Sair</a></li>
    </ul>
    
    </div>
  </nav>
   


    
  `;

  headerContent.innerHTML += template;

  document.body.addEventListener('click', () => {
    const link = document.getElementById('menu-sair');
    if (link) {
      link.addEventListener('click', () => {
        console.log('1babab');
        LogOut();
      });
    }
  });

  return headerContent;
};


// export default () => {
//   const headerContent = document.createElement('header');

//   const template = `     
//     <div class="div-logo-timeline">
//       <img src="./assets/logo-horizontal.png" id="ada-logo-timeline" class="logo-image-timeline" alt="logo da ConectAda">
//     </div>
//     <div class="menu">
//       <button id="create">Create new button</button>
//       <nav id="nav-menu">
//         <ul class="menu-list">
//           <li><a href="#home">Home</a></li>
//           <li><a href="#sobre">Sobre</a></li>
//         </ul>
//       </nav>
//     </div>
//   `;

//   headerContent.innerHTML += template;

//   const navMenu = headerContent.querySelector('#nav-menu');
//   const createBtn = headerContent.querySelector('#create');

//   document.body.addEventListener('click', function (event) {
//     if (event.target.id === 'create') {
//       console.log('bef')
//       navMenu.classList.add('show');
//       console.log('afetr0');
//     }
//   });

//   return headerContent;
// };
