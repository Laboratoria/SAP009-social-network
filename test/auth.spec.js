/* eslint-disable max-len */
// importamos apenas oq vamos a testear
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, signOut,
  onAuthStateChanged, sendEmailVerification,
  // getAuth,
} from 'firebase/auth';

import {
  criarCadastro, fazerLogin, loginComGoogle, sair, observador, verificarEmail,
  // , dadosUsuaria,
} from '../src/firebase/firebase-auth.js';

jest.mock('firebase/auth');

const nome = 'Usuaria Sobrenome';
const email = 'usuaria@email.com';
const senha = '123456';

const mockAuth = { user: { } };
it('deveria criar um cadastro', async () => {
  // createUserWithEmailAndPassword.mockClear(); se for usar mais de 1x
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
  expect(signInWithPopup).toHaveBeenCalledWith(undefined, { });
});

it('deveria fazer o logout', () => {
  sair();
  expect(signOut).toHaveBeenCalledTimes(1);
  expect(signOut).toHaveBeenCalledWith(undefined);
});

it('deveria mostrar usuaria on/off', () => {
  onAuthStateChanged.mockResolvedValue();

  const callback = jest.fn();
  observador(callback);

  expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  expect(onAuthStateChanged).toHaveBeenCalledWith(undefined, () => { });
});

it('deveria verificar se o email de vericação foi enviado', () => {
  sendEmailVerification.mockResolvedValue(mockAuth);

  verificarEmail();

  expect(sendEmailVerification).toHaveBeenCalledTimes(1);
  expect(sendEmailVerification).toHaveBeenCalledWith(mockAuth);
});
