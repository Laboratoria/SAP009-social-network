import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { login, createUser, loginGoggle } from '../src/pages/firebase/auth.js';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('login', () => {
  it('should be a function', () => {
    expect(typeof login).toBe('function');
  });

  it('O usuário deve fazer login com email e senha', () => {
    signInWithEmailAndPassword.mockResolvedValue({ dados: {} });

    const email = 'teste@email.com';
    const senha = 'senhaescolhida';

    login(email, senha);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});

describe('loginGoggle', () => {
  it('should be a function', () => {
    expect(typeof loginGoggle).toBe('function');
  });

  it('O usuário deve conseguir fazer login com google', () => {
    signInWithPopup.mockResolvedValue();
    GoogleAuthProvider.mockResolvedValue();
    loginGoggle();

    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('createUser', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });

  it('O usuário deve criar uma conta com email e senha', () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      updateProfile: updateProfile.mockResolvedValue(),
    });

    const email = 'teste@email.com';
    const senha = 'senhaescolhida';

    createUser(email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});
