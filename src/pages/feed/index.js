export default () => {
  const container = document.createElement("div");
  container.classList.add("container-feed");

  const template = `
  <div>
    <p>teste</p>
  </div>
    `;
  container.innerHTML = template;
  return container;
};
