import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { app } from '../src/firebase/configuration.js';
import { loginWithGoogle, logout } from '../src/firebase/authentication.js';

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

describe('logout', () => {
  it('should logout', async () => {
    signOut.mockResolvedValueOnce();
    const authLogout = getAuth(app);
    const providerLogout = new GoogleAuthProvider();

    await logout(authLogout, providerLogout);
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(authLogout, providerLogout);
  });
});
