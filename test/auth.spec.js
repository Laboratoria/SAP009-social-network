// importamos apenas oq vamos a testear
import { signInWithEmailAndPassword } from 'firebase/auth';
import { criarCadastro } from '../src/firebase/firebase-auth.js';
// fazerLogin, loginComGoogle,
//   dadosUsuaria, sair, observador, verificarEmail
describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});

// const mockUsuarias = {
//   nome: 'Usuaria Sobrenome',
//   email: 'usuaria@email.com',
//   senha: '123456',
//   id: 'jd8as5sa4sa5',
// };
jest.mock('firebase/firebase-auth');

// criar consts 2
// a função do firebase retorna uma promise e usamos
// ela + .mockResolvedValue({ nome }) qndo resolvida a promesa vai retornar esse obj
// oq espera:
// toHaveBeenCalledTimes() // qntas vezes foi chamada
// toHaveBeenCalledWith() // qntos parametros recebeu
it('deveria criar um cadastro', () => {
  const nome = 'Usuaria Sobrenome';
  const email = 'usuaria@email.com';
  const senha = '123456';

  criarCadastro(email, senha, nome);

  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(3);
});
