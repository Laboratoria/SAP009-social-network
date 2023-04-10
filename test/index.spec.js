import { signInWithEmailAndPassword, loginWithGoogle } from 'firebase/auth';
import { loginToFeed } from '../src/firebase/authentication.js';

jest.mock('firebase/auth');

describe('loginToFeed', () => {
  it('should sign in with email and password', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();
    const email = 'marina.cezario@gmail.com';
    const password = '123456';

    await loginToFeed(email, password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
  });

  it('should return invalid email', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();
    const email =
  })
});
