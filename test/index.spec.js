import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  loginGoogle,
  fazerLogout,
  fazerCadastro,
  fazerLogin,
} from '../src/firebase/auth';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fazerLogin', () => {
  it('deve fazer login com email e senha', () => {
    signInWithEmailAndPassword.mockResolvedValue({ dados: {} });
    // mockResolvedValue - simula funcoes assincronas em testes assincronos

    const email = 'teste@gmail.com';
    const senha = '123456';

    fazerLogin(email, senha);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});

describe('loginGoogle', () => {
  it('deve fazer login com google', () => {
    signInWithPopup.mockResolvedValue();
    loginGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('fazerLogout', () => {
  it('deve fazer logout do feed', () => {
    signOut.mockResolvedValue({ user: {} });
    fazerLogout();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe('fazerCadastro', () => {
  it('deve criar uma conta com nome, email e senha', () => {
    createUserWithEmailAndPassword.mockResolvedValue({ cadastro: {} });

    const email = 'teste@gmail.com';
    const senha = '123456';
    const nome = 'teste';

    fazerCadastro(email, senha, nome);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, senha, nome);
  });
});
