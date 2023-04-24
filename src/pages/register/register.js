export default () => {
  const containerRegister = document.createElement('div');

  const registerScreen = `
    <img src="imagens/duas-mulheres-pagina-de-cadastro.png" alt="duas-mulheres-negras">
    <h1>Quer as melhores dicas para cuidar dos seus cachos? Vem com a gente!</h1>
    <form action="formulario-de-cadastro">
      <input type="nome" placeholder="Nome">
      <input type="sobrenome" placeholder="sobrenome">
      <input type="date" name="data" id="data-de-nascimento">
      <input type="cidade-UF" placeholder="cidade-UF">
      <label for="input-curvatura">Qual a curvatura dos seus cachos?</label>
      <input type="curvatura-2abc-3abc-4abc" placeholder="2abc/3abc/4abc">
      <input type="email" placeholder="Email">
      <input type="senha" placeholder="Senha">
      <input type="repetir-a-senha" placeholder="Repita a senha">
      <input type="button" value="cadastrar" id="button-register">
    </form>`;
  containerRegister.innerHTML = registerScreen;
};
