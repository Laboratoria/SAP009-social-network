export const redirectToPage = (hash) => {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
};
