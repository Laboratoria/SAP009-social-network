export default () => {
  const container = document.createElement('div');

  const template = `
    <h1>teste</h1>
    <p> página do feed aqui </p>
      `;

  container.innerHTML = template;
  return container;
};
