export function maiorDe18(dataNascimento) {
  // verificar se é maior de 18
  const dataAtual = new Date();
  const idadeAtual = dataNascimento.split('-');
  const anos = dataAtual.getFullYear() - idadeAtual[2];

  if (anos >= 19) {
    return true;
  }
  return false;
}

export function exibeErros(erro) {
  switch (erro) {
    case 'auth/email-already-exists':
      console.log('este email já está em uso, utilize outro email ou faça login');
      break;
    case 'auth/user-not-found':
      console.log('este usuário não existe, crie um cadastro');
      break;
    case 'auth/too-many-requests':
      console.log('sobrecarga, tente novamente em instantes');
      break;
    case 'auth/internal-error':
      console.log('houve um erro inesperado, tente novemente em instantes');
      break;
    case 'auth/cancelled-popup-request':
      console.log('solicitação cancelada');
      break;
    case 'auth/popup-closed-by-user':
      console.log('a janela de login com Google foi fechada');
      break;
    case 'auth/wrong-password':
      console.log('senha incorreta');
      break;
    case 'auth/network-request-failed':
      console.log('houve um problema de conexão com a internet');
      break;
    case 'auth/invalid-email':
      console.log('o email fornecido é inválido, tente novamente');
      break;
    case 'auth/missing-email':
      console.log('digite um email para fazer login');
      break;
    default:
      console.log('ocorreu um erro inesperado');
  }
}
