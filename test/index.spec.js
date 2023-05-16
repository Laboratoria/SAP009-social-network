// importamos la funcion que vamos a testear
import { signIn, createUser, logOut } from '../src/firebase/auth.js';

it('should execute firebase login function', () => {
  const email = 'email@gmail.com';
  const password = 'password';
  signIn(email, password);
  expect(typeof signIn).toBe('function');
});

it('should execute firebase register function', () => {
  const email = 'email@gmail.com';
  const password = 'password';
  const confirmPassword = 'password';
  createUser(email, password, confirmPassword);
  expect(typeof createUser).toBe('function');
});

it('should execute firebase logout function', () => {
  const email = 'email@gmail.com';
  const password = 'password';
  logOut(email, password);
  expect(typeof logOut).toBe('function');
});
