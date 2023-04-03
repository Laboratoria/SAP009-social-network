export default () => {
  const publishContainer = document.createElement('div');

  const publishScreen = `

  <section>
  <img id='bumerangue-gif' src='assets/imagens/bumerangue.gif'>

    <input id='publication' type='textArea' placeholder= 'O que deseja compartilhar?'> </input>

    <a id='cancel-button' type='button'  href='#feed'> Cancelar </a>
    <a id='publication-button'type='button'href='#feed'> Publicar </a>

    <!--icones emojis reações-->
    <h2> Entendendo as reações</h2>
    <img id='reactions-gif' src='assets/imagens/reacoes.gif'>
  </section>
  
      `;

  publishContainer.innerHTML = publishScreen;

     //COLOCAR AQUI OS AS MANIPULAÇÕES DINAMICAS DO DOM, PEGANDO OS IDS DO HTML E/OU CSS
    // COLOCAR OS EVENTOS DOS BOTOES DE ENTRAR, ENTRAR C/ GOOGLE E CADASTRAR
    // CRIAR AS CONDICIONAIS SE O EMAIL E/OU SENHA ESTIVEREM ERRADOS, OU SE O EMAIL JÁ FOR OU NÃO CADASTRADO, ETC...v
  
  return publishContainer;
};
