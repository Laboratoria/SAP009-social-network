export default () => {
  const container = document.createElement('div');

  const template = `
  <form>
  <input placeholder="Digite seu nome" > 
  
  </form>
`;

  container.innerHTML = template;
  return container;
};
