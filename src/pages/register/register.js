export default () => {
  const container = document.createElement('div');

  const template = `
    <p>Registre-se</p>
  `;

  container.innerHTML = template;

  return container;
};
