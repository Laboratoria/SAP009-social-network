import { signInWithEmailAndPassword } from 'firebase/auth';
import { login } from '../Firebase/logincadastro.js';

jest.mock('firebase/auth');

describe('login', () => {
  it('debería ser una función', () => {
    expect(typeof login).toBe('function');
  });
  it('quando chamar a função de login deve ser chamado o signInWithEmailAndPassword com os parametros corretos ', () => {
    const email = 'teste@email.com';
    const password = 'qualquercoisa';
    login(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
  });
});
