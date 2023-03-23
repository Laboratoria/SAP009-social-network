export default () => {
  const container = document.createElement('div');

  const template = `
  <h2>aqui vamos escrever sobre a rede social</h2>
  `;

  container.innerHTML = template;

  return container;
};
