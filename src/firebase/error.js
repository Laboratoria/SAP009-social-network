export function errorMessages(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "⚠️ Esse endereço de e-mail não é válido!";
    case "auth/user-not-found":
      return " &#x274C Usuário não encontrado!";
    case "auth/email-already-in-use":
      return "⚠️ Este e-mail já está em uso!";
    case "auth/weak-password":
      return "&#x274C A senha deve ter 6 ou mais caracteres!";
    case "auth/invalid-display-name":
      return "&#x274C O nome do usuário é inválido.";
    case "auth/wrong-password":
      return "&#x274C Senha incorreta!";
    default:
      return ` &#x274C Aconteceu um erro não identificado, entre em contato e informe o erro a seguir: ${error.code}`;
  }
}

export function validationLogin(email, password) {
  if (email === "") {
    return "⚠️ Por favor, preencha o campo de e-mail!";
  }
  if (password === "") {
    return "⚠️ Por favor, preencha o campo de senha!";
  }
  return "";
}
export function validateRegister(name, email, password, confirmPassword) {
  if (name === "") {
    return "⚠️ Por favor, preencha seu nome!";
  }
  if (email === "") {
    return "⚠️ Por favor, preencha o campo de e-mail!";
  }
  if (password === "") {
    return "⚠️ Por favor, escolha uma senha!";
  }
  if (confirmPassword === "") {
    return "⚠️ Por favor, confirme sua senha!";
  }
  if (password !== confirmPassword) {
    return "&#x274C As senhas não são compatíveis...";
  }
  return "";
}
