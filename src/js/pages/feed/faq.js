export default () => {
  const faqContainer = document.createElement('section');
  faqContainer.classList.add('about-section');

  const faqTemplate = `
  <div class="faq-container">
    <h1>Perguntas mais frequentes:</h1>
    <div class="questions">
      <h2>O que irei encontrar na S2S?</h2>
      <p>Na S2S, você encontrará todos os assuntos, temas e tópicos relacionados à língua inglesa,
      além da troca de experiências e interações com pessoas que também se identificam com o assunto.
      Dessa maneira todes poderão aprender, praticar e melhorar o Inglês.</p>
      <h2>Como fazer o cadastro?</h3>
      <p>Na página inicial clique em "sign in" e irá abrir a página para fazer o login. Nessa página, 
      terá a opção "Click here if you still don't have an account" ("Clique aqui se você ainda não tem
      uma conta"), que irá abrir a página para fazer o cadastro. Insira todos os dados solicitados
      na tela e dessa forma seu cadastro será concluído com sucesso.</p>
      <h2>Se eu já tenho uma conta, como prosseguir?</h4>
      <p>Se você já tiver uma conta, basta clicar em "sign in" e inserir os dados para fazer o login.
      Dessa forma você será redirecionado diretamente para a página do feed.</p>
      <h2>É possível fazer o login pela minha conta do Google?</h5>
      <p>Sim! Basta você entrar em "sign in" e verá a opção "Sign in with Google"("Login com Google")
      e assim o login será a feito através da sua conta do Google/Gmail e você será redirecionado para a 
      página do feed.</p>
      <h2>O que podemos no S2S?</h2>
      <p>A ideia é que aqui, você possa dar dicar e sugestões sobre e em Inglês. Em nosso projeto futuro,
      queremos que todos possam iteragir comentando e pedindo ajuda sobre a cultura que envolver o idioma!</p>
      <h1>Feel free to explore S2S!</h1>
    </div>
  </div>
  `;
  faqContainer.innerHTML = faqTemplate;

  return faqContainer;
};
