export default () => {
  const container = document.createElement('div');
  const templaite = `
  <h1 class='login'>Login</h1>`;

  container.innerHTML = templaite;
  return container;
};
