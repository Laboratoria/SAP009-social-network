export function errorLogin(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email.';
    case 'auth/user-not-found':
      return 'You do not have an account. Please, register.';
    case 'auth/email-already-in-use':
      return 'You already have an account.';
    case 'auth/weak-password':
      return 'The password must have at least 6 digits.';
    case 'auth/invalid-password':
      return 'The password is invalid.';
    case 'auth/wrong-password':
      return 'The password is incorrect.';
    default:
      return 'Something went wrong. Please, contact us.';
  }
}

export function errorSignUp (error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email.';
    case 'auth/email-already-in-use':
      return 'You already have an account.';
    case 'auth/weak-password':
      return 'The password must have at least 6 digits.';
    case 'auth/invalid-password':
      return 'The password is invalid.';
    case 'auth/wrong-password':
      return 'The password is incorrect.';
    default:
      console.log('Something went wrong. Please, contact us.');
      break;
}
  return errorSignUp;
}
