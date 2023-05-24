import { signInWithEmailAndPassword, signIn } from '../src/lib/login-firebase.js';

jest.mock('firebase/auth');

describe('signIn', () => {
  it('should be a function', () => {
    expect(typeof signIn).toBe('function');
  });
  it('Quando chamar a função de signIn deve ser chamado o signInWithEmailAndPassword com os parametros corretos', () => {
    const email = 'teste@emaill.com';
    const senha = '123456';
    signIn(email, senha);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});
