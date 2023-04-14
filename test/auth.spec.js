/* eslint-disable max-len */
// importamos apenas oq vamos a testear
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, signOut, onAuthStateChanged,
  // getAuth,
} from 'firebase/auth';

import {
  criarCadastro, fazerLogin, loginComGoogle, sair, observador,
  // , dadosUsuaria, verificarEmail,
} from '../src/firebase/firebase-auth.js';

// const mockUsuarias = { nome: 'Usuaria Sobrenome', email: 'usuaria@email.com', senha: '123456', id: 'jd8as5sa4sa5', };

jest.mock('firebase/auth');

const nome = 'Usuaria Sobrenome';
const email = 'usuaria@email.com';
const senha = '123456';

it('deveria criar um cadastro', async () => {
  // createUserWithEmailAndPassword.mockClear(); se for usar mais de 1x
  const mockAuth = { user: { } };
  createUserWithEmailAndPassword.mockResolvedValue(mockAuth);
  updateProfile.mockReturnValue();

  await criarCadastro(email, senha, nome);

  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  expect(updateProfile).toHaveBeenCalledTimes(1);
  expect(updateProfile).toHaveBeenCalledWith(mockAuth.user, { displayName: nome });
});

it('deveria fazer login', () => {
  fazerLogin(email, senha);

  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
});

it('deveria fazer login com google', () => {
  loginComGoogle();
  expect(signInWithPopup).toHaveBeenCalledTimes(1);
  expect(signInWithPopup).toHaveBeenCalledWith(undefined, { }); // não recebe parametro
});

it('deveria fazer o logout', () => {
  sair();
  expect(signOut).toHaveBeenCalledTimes(1);
  expect(signOut).toHaveBeenCalledWith(undefined);
});

it('deveria mostrar usuaria on/off', () => {
  observador();
  expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  expect(onAuthStateChanged).toHaveBeenCalledWith(undefined, Function);
});
