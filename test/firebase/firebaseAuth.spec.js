import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmail } from '../../src/firebase/auth';

describe('create user with email', () => {
  it('should create a new user with an email account', () => {
    const newUser = {
      email: 'teste@teste.com',
      password: '123456',
    };
    return expect(createUserWithEmail()).resolves.toBe(newUser);
  });

  it('in case to return an error', () => expect(createUserWithEmail()).rejects.toMatch('error'));
});
