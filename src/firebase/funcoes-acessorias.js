// export function maiorDe18() { // parametro não ta sendo aceito pq tem mesmo nome da const
//   // verificar se é maior de 18
//   const criaCadastro = document.createElement('section');
//   const nascimento = criaCadastro.querySelector('#data');
//   const dataNascimento = '08-12-2011';
//   const dataAtual = new Date();
//   console.log(dataAtual);

//   const idadeAtual = dataNascimento.split('-');
//   console.log(idadeAtual);

//   const anos = dataAtual.getFullYear() - idadeAtual[2];

//   if (anos >= 19) {
//     console.log('passa');
//     console.log(anos);
//     return true;
//   }
//   // return anos >= 19 ? true : false;
//   console.log('não passa');
//   console.log(anos);
//   return false;
//   // const mes = idadeAtual[1] - dataAtual.getMonth();
//   // const dia = idadeAtual[0] - dataAtual.getDay();
//   // console.log(ano, mes, dia);
// }

// export function exibeErros(error) {
//   switch (error) {
//     case 'auth/email-already-exists':
//       console.log('este email já está em uso');
//       break;
//     case 'auth/user-not-found':
//       console.log('este usuário não existe, crie um cadastro');
//       break;
//     case 'auth/too-many-requests':
//       console.log('sobrecarga, tente novamente em instantes');
//       break;
//     case 'auth/internal-error':
//       console.log('houve um erro inesperado, tente novemente em instantes');
//       break;
//     case 'auth/cancelled-popup-request':
//       console.log('solicitação cancelada');
//       break;
//     case 'auth/popup-closed-by-user':
//       console.log('a janela de login com Google foi fechada');
//       break;
//     case 'auth/wrong-password':
//       console.log('senha incorreta');
//       break;
//     case 'auth/network-request-failed':
//       console.log('houve um problema de conexão com a internet');
//       break;
//     case 'auth/invalid-email':
//       console.log('o email fornecido é inválido, tente novamente');
//       break;
//     case '':
//       console.log('');
//       break;
//     default:
//       console.log('ocorreu um erro inesperado');
//   }
// }
