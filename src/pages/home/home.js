export default () => {
  const container = document.createElement('div');
  const template = ` 
  <header>  
    <div class="containerHome">
      <nav>
        <div class="icones">
          <i class="fa-solid fa-house"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="icones">
          <i class="fa-solid fa-plus"></i>
        </div>
      </nav>
    </div>
  </header>
    <section id="bordaCadastro">
     
    </section>  
  `;
  container.innerHTML = template;
  //  getAuth user
  return container;
};
