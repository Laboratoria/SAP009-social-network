import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  createUserWithEmail, signIn, loginGoogle, logOut,
} from '../../src/firebase/auth';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

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
  it('logar com e-mail e senha', () => {
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
  it('logar com a conta do Google', () => {
    signInWithPopup.mockResolvedValue();
    loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

// Função para saber se a pessoa fez logout
describe('logOut', () => {
  it('saber se o usuário saiu do servidor', () => {
    signOut.mockResolvedValue();
    logOut();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

// Função para saber se a pessoa está conectada
describe('onAuthStateChanged', () => {
  it('saber se o usuário está conectado', () => {
    onAuthStateChanged.mockResolvedValue();
    onAuthStateChanged();
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  });
});
