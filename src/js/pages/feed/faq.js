export default () => {
  const faqContainer = document.createElement('section');
  faqContainer.classList.add('about-section');

  const faqTemplate = `
  <div class="faq-container">
    
  </div>
  `;
  faqContainer.innerHTML = faqTemplate;

  return faqContainer;
};
