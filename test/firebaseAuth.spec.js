import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  createUser,
  valuesLogin,
  googleLogin,
  sairPerfil,
} from '../src/servicesFirebase/firebaseAuth';

// função de criar usuário//
jest.mock('firebase/auth');
describe('criarUsuario e atualizar o perfil', () => {
  it('a função deve criar uma conta do usuário utilizando o email e senha e atualizar o perfil', async () => {
    const mockUserCredential = {
      user: {},
    };
    createUserWithEmailAndPassword.mockResolvedValueOnce(mockUserCredential);
    const email = 'teste@teste.com';
    const senha = '12345678';
    await createUser(email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockUserCredential.user, { email, senha });
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

// função logar Google//

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

describe('logarUsuárioComGoogle', () => {
  it('a função deve logar a conta do usuário utilizando o email do Google', async () => {
    signOut.mockResolvedValueOnce();
    await sairPerfil();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(undefined);
  });
});
