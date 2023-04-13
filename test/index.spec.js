import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { fazerLogin, fazerLoginComGoogle } from '../src/firebase/firebase';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fazerLogin', () => {
  it('O usuário deve fazer login com email e senha', () => {
    signInWithEmailAndPassword.mockResolvedValue({ dados: {} });

    const email = 'teste@email.com';
    const senha = 'senhaescolhida';

    fazerLogin(email, senha);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, senha);
  });
});

describe('fazerLoginComGoogle', () => {
  it('O usuário deve conseguir fazer login com google', () => {
    signInWithPopup.mockResolvedValue();
    fazerLoginComGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});
