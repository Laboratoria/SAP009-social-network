import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../src/firebase/configuration.js';
import { loginWithGoogle } from '../src/firebase/authentication.js';

jest.mock('firebase/auth');

describe('loginWithGoogle', () => {
  it('should sign in with Google account', async () => {
    signInWithPopup.mockResolvedValueOnce();
    const providerGoogle = new GoogleAuthProvider();
    const authGoogle = getAuth(app);

    await loginWithGoogle(authGoogle, providerGoogle);
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(authGoogle, providerGoogle);
  });
});
