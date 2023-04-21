import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  createUser,
  valuesLogin,
  googleLogin,
  sairPerfil,
  verificaUsuarioLogado,
} from '../src/servicesFirebase/firebaseAuth';

// função de criar usuário//
jest.mock('firebase/auth');
describe('criarUsuario e atualizar o perfil', () => {
  it('a função deve criar uma conta do usuário utilizando o email e senha e atualizar o perfil', async () => {
    const mockAuth = {
      currentUser: {},
    };
    getAuth.mockReturnValueOnce(mockAuth);
    createUserWithEmailAndPassword.mockResolvedValueOnce();
    const email = 'teste@teste.com';
    const senha = '12345678';
    const displayName = 'testeName';
    await createUser(email, senha, displayName);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockAuth.currentUser, { displayName });
  });
});

// função de login//

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

// função sair do perfil //

describe('logarUsuárioComGoogle', () => {
  it('a função deve logar a conta do usuário utilizando o email do Google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    GoogleAuthProvider.mockReturnValueOnce();
    await googleLogin();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(undefined, {});
  });
});

// função sair do perfil //

describe('sairDaConta', () => {
  it('a função deve realizar o logOut da conta do usuário', async () => {
    signOut.mockResolvedValueOnce();
    await sairPerfil();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(undefined);
  });
});

// verificar usuário logado //
describe('Permanecer usuário logado', () => {
  it('O usuário deve permanecer logado', () => {
    const callback = jest.fn();
    verificaUsuarioLogado(callback);
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(onAuthStateChanged).toHaveBeenCalledWith(undefined, callback);
  });
});
