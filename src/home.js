export default () => {
  const container = document.createElement("section");

  const template = `
   <h2 id="Bem-vindo">Bem vindo (a) !</h2>
      <p id="qualidade">"A sua qualidade de vida é como um <span>bumerangue</span>, precisa ter movimento. Todas as ações que você lançar, voltarão em sua direção ainda mais fortes."</p>
      <p id="ações">Melhore suas ações,
        pratique atividade física!</p>
   
      <img src="imagens/logo.png" id="image-logo" alt="Logotipo QA- Qualidade de ações">
      <input placeholder="E-MAIL"></input>
      <input placeholder="SENHA"></input>
      <input type="button" value="ENTRAR"></input>
      <p>ou</p>
      <p>Faça login com sua conta </p><a>GOOGLE</a>
      <p>Não tem uma conta?</p><a>CADASTRE-SE</a>
  `;

  container.innerHTML = template;

  return container;
};
