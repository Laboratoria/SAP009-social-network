export function errorsFirebase(error) {
  switch (error) {
    case 'auth/invalid-email':
      return 'O e-mail inserido é inválido';
    case 'auth/user-not-found':
      return 'O e-mail inserido não está cadastrado';
    case 'auth/email-already-in-use':
      return 'O e-mail inserido já possui cadastro';
    case 'auth/weak-password':
      return 'A senha deve ter 6 ou mais caracteres';
    case 'auth/invalid-password':
      return 'Senha inválida';
    case 'auth/wrong-password':
      return 'Senha incorreta';
    default:
      return '';
  }
}

export function validateLogin(email, password) {
  if (email === '') {
    return 'Insira um e-mail';
  }
  if (password === '') {
    return 'Insira uma senha';
  }
  return '';
}

export function validateRegister(name, email, password) {
  if (!name && !email && !password) {
    return 'Preencha todos os campos';
  }

  if (name === '') {
    return 'Insira um nome';
  }
  if (email === '') {
    return 'Insira um e-mail';
  }

  if (email === false) {
    return 'Insira um e-mail válido (ex: nome@email.com)';
  }
  /*
  if (email !== emailRepeat) {
    return 'Os e-mails não correspondem';
  }
*/
  if (password === '') {
    return 'Digite sua senha';
  }
  /*
  if (password !== passwordRepeat) {
    return 'As senhas não correspondem';
  }
*/
  return '';
}
