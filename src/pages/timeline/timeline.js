export default () => {
  const container = document.createElement('div');

  const template = `
    <p>Timeline</p>
  `;

  container.innerHTML = template;

  return container;
};
