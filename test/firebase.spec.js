import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import {
  fazerLogin,
  fazerLoginComGoogle,
  fazerCadastro,
} from '../src/firebase/firebase';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fazerLogin', () => {
  it('should be a function', () => {
    expect(typeof fazerLogin).toBe('function');
  });

  it('O usuário deve fazer login com email e senha', () => {
    signInWithEmailAndPassword.mockResolvedValue({ dados: {} });

    const email = 'teste@email.com';
    const senha = 'senhaescolhida';

    fazerLogin(email, senha);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});

describe('fazerLoginComGoogle', () => {
  it('should be a function', () => {
    expect(typeof fazerLoginComGoogle).toBe('function');
  });

  it('O usuário deve conseguir fazer login com google', () => {
    signInWithPopup.mockResolvedValue();
    GoogleAuthProvider.mockResolvedValue();
    fazerLoginComGoogle();

    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('fazerCadastro', () => {
  it('should be a function', () => {
    expect(typeof fazerCadastro).toBe('function');
  });

  it('O usuário deve criar uma conta com email e senha', () => {
    createUserWithEmailAndPassword.mockResolvedValue();
    const mockAuth = { currentUser: {} };
    getAuth.mockReturnValue(mockAuth);

    const email = 'teste@email.com';
    const senha = 'senhaescolhida';

    fazerCadastro(email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, senha);
  });
});
