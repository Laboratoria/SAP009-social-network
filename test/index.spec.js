// importamos la funcion que vamos a testear
import { signIn } from '../src/firebase/auth.js';

it('should execute firebase login function', () => {
  const email = 'email@gmail.com';
  const password = 'password';
  signIn(email, password);
  expect(typeof signIn).toBe('function');
});
