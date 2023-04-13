/* eslint-disable max-len */
// importamos apenas oq vamos a testear
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,
  //  signInWithPopup, signOut, onAuthStateChanged,getAuth,
} from 'firebase/auth';

import {
  criarCadastro, fazerLogin,
  //  loginComGoogle, sair, observador,
} from '../src/firebase/firebase-auth.js';
// , dadosUsuaria, observador, verificarEmailloginComGoogle,,

// const mockUsuarias = { nome: 'Usuaria Sobrenome', email: 'usuaria@email.com', senha: '123456', id: 'jd8as5sa4sa5', };

jest.mock('firebase/firebase-auth');

const nome = 'Usuaria Sobrenome';
const email = 'usuaria@email.com';
const senha = '123456';

it('deveria criar um cadastro', async () => {
  // createUserWithEmailAndPassword.mockClear(); se for usar mais de 1x
  const mockAuth = { user: { } };
  createUserWithEmailAndPassword.mockResolvedValue({ }); // pra qndo tem o then e catch? pra qndo espera uma resposta e chama outra função que retorna um valor novo, nesse caso o nome
  // a promise resolved de updateProfile retorna: displayName: name
  // getAuth.mockReturnValue(mockAuth);
  updateProfile.mockReturnValue();

  await criarCadastro(email, senha, nome);

  expect(createUserWithEmailAndPassword()).toHaveBeenCalledTimes(1);
  expect(createUserWithEmailAndPassword()).toHaveBeenCalledWith(email, senha);
  expect(updateProfile()).toHaveBeenCalledTimes(1);
  expect(updateProfile()).toHaveBeenCalledTimes(mockAuth.user, { displayName: nome });
});

it('deveria fazer login', () => {
  fazerLogin(email, senha);

  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(email, senha);
});

// it('deveria fazer login com google', () => {
//   loginComGoogle();
//   expect(signInWithPopup).toHaveBeenCalledTimes(1);
//   expect(signInWithPopup).toHaveBeenCalledWith(false); // não recebe parametro
// });

// it('deveria fazer o logout', () => {
//   sair();
//   expect(signOut).toHaveBeenCalledTimes(1);
//   expect(signOut).toHaveBeenCalledWith(false);
// });

// it('deveria mostrar usuaria on/off', () => {
//   observador();
//   expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
//   expect(onAuthStateChanged).toHaveBeenCalledWith(false);
// });
