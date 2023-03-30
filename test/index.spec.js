import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  createUser,
  valuesLogin,
  googleLogin,
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


jest.mock('firebase/auth');
describe('logarUsuárioComGoogle', () => {
  it('a função deve logar a conta do usuário utilizando o email do Google', async () => {
    signInWithPopup.mockResolvedValueOnce();
    GoogleAuthProvider.mockReturnValueOnce();
    await googleLogin();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(undefined, {});
  });
});
