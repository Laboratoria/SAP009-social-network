export function getErrors(error) {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Usuário não encontrado.';
    case 'auth/invalid-email':
      return 'O endereço de e-mail não é válido.';
    case 'auth/email-already-in-use':
      return 'O e-mail inserido já possui cadastro.';
    case 'auth/wrong-password':
      return 'Senha incorreta.';
    case 'auth/invalid-display-name':
      return 'O nome do usuário é inválido.';
    case 'auth/missing-password':
      return 'Por favor, digite a senha!';
    case 'auth/weak-password':
      return 'A senha deve ter 6 ou mais caracteres.';
    default:
      return `Aconteceu um erro não identificado, por favor entre em contato com as desenvolvedoras e indique o código que aparecerá a seguir: ${error.code}`;
  }
}
