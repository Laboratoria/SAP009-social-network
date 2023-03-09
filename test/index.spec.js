import {
  criarUsuario,
  autenticarUsuario,
  logarGoogle,
} from '../src/firebase/firebase';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from '../src/mocks/export.js';

jest.mock('../src/mocks/export.js');

// função de autenticar usuário
describe('autenticarUsuario', () => {
  it('autentica dados do login e libera a página do feed ', () => {
    autenticarUsuario(signInWithEmailAndPassword);
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
