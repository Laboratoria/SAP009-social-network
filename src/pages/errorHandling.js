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
    // case "Firebase: Error (auth/invalid-email).":
    //   errorLabel.innerHTML = "E-mail inválido";
    //   break;
    default:
      errorLabel.innerHTML = '';
      break;
  }
}
