// importamos la funcion que vamos a testear
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { cadastrar } from '../src/lib/api.js';

jest.mock('../src/lib/api.js');
describe('cadastrar', () => {
  it('deve cadastrar os usuários a partir do nome de usuário e e-mail', () => {
    expect(typeof cadastrar).toBe('function');
  });
  const email = 'teste@123.com';
  const password = '123456';
  cadastrar('teste', email, password);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
});
