import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  criarUsuario,
  autenticarUsuario,
  logarGoogle,
} from '../src/firebase/firebase';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
}));

// função de autenticar usuário
describe('autenticarUsuario', () => {
  it('autentica dados do login e libera a página do feed ', () => {
    signInWithEmailAndPassword.mockResolvedValue();
    autenticarUsuario('luiginho@test.com', 'fofo');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

// função de criar usuário

describe('criarUsuario', () => {
  it('deve criar um usuário', () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: {},
    });
    criarUsuario('teste@teste.com', 'teste123');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

// logar com o google
describe('logarGoogle', () => {
  it('a função deve logar usuário com a sua conta google', () => {
    signInWithPopup.mockResolvedValue();
    logarGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});
