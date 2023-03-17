import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  createUserWithEmail, signIn, loginGoogle, logOut,
} from '../../src/firebase/auth';

jest.mock('firebase/auth');

jest.clearAllMocks();

// Teste função de cadastro
describe('createUserWithEmail', () => {
  it('should create a new user', () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {},
    });
    createUserWithEmail('teste@teste.com', 'teste123');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

// Teste função de login
describe('signIn', () => {
  it('should login with and email and password', () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: {},
      password: {},
    });
    signIn('email@teste.com', '123456');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

// Teste login com o Google
describe('loginGoogle', () => {
  it('should login with a Google account', () => {
    signInWithPopup.mockResolvedValue();
    loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

// Função para saber se a pessoa fez logout
describe('logOut', () => {
  it('should show if the user is logged out', () => {
    signOut.mockResolvedValue();
    logOut();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
