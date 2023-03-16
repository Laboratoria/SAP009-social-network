/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  createUser, login, googleLogin, logOut,
} from '../../src/servicesFirebase/firebaseAuth';

jest.mock('firebase/auth');

it('deve criar usuario e atualizar perfil com sucesso', async () => {
  const mockUserCredential = {
    user: {},
  };
  createUserWithEmailAndPassword.mockResolvedValueOnce(mockUserCredential);
  updateProfile.mockResolvedValueOnce();

  const email = 'qualquer@email.com';
  const senha = 'senhafacil';
  const nome = 'nometeste';
  const sobrenome = 'sobrenometeste';
  const displayName = 'usernameteste';
  await createUser(email, senha, nome, sobrenome, displayName);

  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  expect(updateProfile).toHaveBeenCalledTimes(1);
  // eslint-disable-next-line max-len
  expect(updateProfile).toHaveBeenCalledWith(mockUserCredential.user, { nome, sobrenome, displayName });
});

it('deve logar com o usuario criado', async () => {
  signInWithEmailAndPassword.mockResolvedValueOnce();

  const email = 'qualquer@email.com';
  const senha = 'senhafacil';
  await login(email, senha);

  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
});

it('deve logar com o google', async () => {
  signInWithPopup.mockResolvedValueOnce();
  const provider = 'google';
  GoogleAuthProvider.mockReturnValueOnce(provider);

  await googleLogin();

  expect(signInWithPopup).toHaveBeenCalledTimes(1);
  expect(signInWithPopup).toHaveBeenCalledWith(undefined, provider);
});

it('deve realizar logout do usuário', async () => {
  signOut.mockResolvedValueOnce();
  await logOut();

  expect(signOut).toHaveBeenCalledTimes(1);
  expect(signOut).toHaveBeenCalledWith(undefined);
});
