import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { loginToFeed, resetPassword } from '../src/firebase/authentication.js';

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
});

describe('resetPassword', () => {
  it('should send the user an email to change the password', async () => {
    sendPasswordResetEmail.mockResolvedValueOnce();
    const email = 'marina.cezario@gmail.com';

    await resetPassword(email);

    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(undefined, email);
  });
});
