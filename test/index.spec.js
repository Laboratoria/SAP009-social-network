/* eslint-disable implicit-arrow-linebreak */
import {
  googleLogin,
  userLogin,
  createUser,
} from '../src/firebase/auth.js';

const createUserWithEmailAndPassword = jest.fn();
const signInWithEmailAndPassword = jest.fn();

jest.mock('firebase/auth');

describe('googleLogin', () => {
  const signInWithPopup = jest.fn();

  it('should be a function', () =>
    expect(typeof googleLogin).toBe('function'));

  it('should call signInWithPopup', () => {
    googleLogin('provider');
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('userLogin', () => {
  it('should be a function', () => {
    expect(typeof userLogin).toBe('function');
  });
  it('should call Firebase signInWithEmailAndPassword function', () => {
    const email = 'testeqa@hotmail.com';
    const password = '123456789';
    userLogin(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('createUser', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });

  it('should call Firebase createUserWithEmailAndPassword( function', () => {
    const email = 'testeqa@hotmail.com';
    const password = '123456789';
    const username = 'Qualidade de ações';
    createUser(email, password, username);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});
