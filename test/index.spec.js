import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

import {
  createUser,
  valuesLogin,
  googleLogin,
  sairPerfil,
} from '../src/servicesFirebase/firebaseAuth';

// função de criar usuário//
jest.mock('firebase/auth');
describe('criarUsuario', () => {
  it('a função deve criar uma conta do usuário utilizando o email e senha', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce();
    const email = 'teste@teste.com';
    const senha = '12345678';
    await createUser(email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, senha);
  });
});

// função de login//
jest.mock('firebase/auth');
describe('logarUsuário', () => {
  it('a função deve logar a conta do usuário utilizando o email e senha', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();
    const email = 'teste@teste.com';
    const senha = '12345678';
    await valuesLogin(email, senha);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, senha);
  });
});

// função logar Google//
jest.mock('firebase/auth');
describe('sairDaConta', () => {
  it('a função deve realizar o logOut da conta do usuário', async () => {
    signInWithPopup.mockResolvedValueOnce();
    GoogleAuthProvider.mockReturnValueOnce();
    await googleLogin();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(undefined, {});
  });
});

// função sair do perfil //
jest.mock('firebase/auth');
describe('logarUsuárioComGoogle', () => {
  it('a função deve logar a conta do usuário utilizando o email do Google', async () => {
    signOut.mockResolvedValueOnce();
    await sairPerfil();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(undefined);
  });
});
