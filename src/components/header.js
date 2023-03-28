// header.js
export default function createHeader() {
  const header = document.createElement('div');

  const template = `     
        <div class= "div-logo-timeline">
          <img src="./assets/logo-horizontal.png" id="ada-logo-timeline" class="logo-image-timeline" alt="logo da ConectAda">
        </div>
        <div class="menu">
        <p>Menu</p>
        </div>     
    `;

  header.innerHTML = template;

  return header;
}
