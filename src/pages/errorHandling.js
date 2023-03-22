export function showErrorMessage(error) {
  const errorLabel = document.querySelector('#error-label');
  switch (error) {
    case 'Firebase: Error (auth/email-already-in-use).':
      errorLabel.innerHTML = 'E-mail já cadastrado';
      break;
    case 'Firebase: Error (auth/invalid-email).':
      errorLabel.innerHTML = 'E-mail inválido';
      break;
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      errorLabel.innerHTML = 'A senha deve ter mais de 6 caracteres';
      break;
    case 'Firebase: Error (auth/wrong-password).':
      errorLabel.innerHTML = 'Senha inválida';
      break;
    case 'Firebase: Error (auth/user-not-found).':
      errorLabel.innerHTML = 'E-mail não cadastrado';
      break;
    case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
      errorLabel.innerHTML = 'O acesso à sua conta foi temporariamente desabilitado por excesso de tentativas. Tente novamente mais tarde.';
      break;
    default:
      errorLabel.innerHTML = '';
      break;
  }
}
