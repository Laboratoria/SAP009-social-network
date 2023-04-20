import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

import {
  googleLogin,
  logOut,
  createUser,
  userLogin,
} from '../src/firebase/auth';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('userLogin', () => {
  it('must login with email and password', () => {
    signInWithEmailAndPassword.mockResolvedValue({ dados: {} });
    const email = 'testeqa@hotmail.com';
    const password = '123456789';

    userLogin(email, password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
  });
});

describe('googleLogin', () => {
  it('must log in with google', () => {
    signInWithPopup.mockResolvedValue();
    googleLogin();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('logOut', () => {
  it('must log out of the feed', () => {
    signOut.mockResolvedValue({ user: {} });
    logOut();
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

describe('createUser', () => {
  it('must create an account with email and password', async () => {
    const mockAuth = getAuth();
    createUserWithEmailAndPassword.mockResolvedValue();

    const email = 'testeqa@hotmail.com';
    const password = '123456789';

    await createUser(email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
  });
});
