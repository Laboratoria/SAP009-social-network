import {
  googleLogin,
  userLogin,
  createUser,
} from '../src/firebase/auth.js';

const createUserWithEmailAndPassword = jest.fn();
const signInWithEmailAndPassword = jest.fn();
const signInWithPopup = jest.fn();

jest.mock('firebase/auth');

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});
