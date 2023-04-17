import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from '../src/firebase/configuration.js';
import {
  loginToFeed,
  loginWithGoogle,
  register,
  logout,
  resetPassword,
  isUserLogged,
} from '../src/firebase/authentication.js';

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

describe('register', () => {
  it('should sign up with name, email, password', async () => {
    createUserWithEmailAndPassword.mockResolvedValue();
    const mockAuth = { currentUser: {} };
    getAuth.mockReturnValue(mockAuth);
    updateProfile.mockReturnValue();

    const name = 'Bruna';
    const email = 'brunasilveira.adm@gmail.com';
    const password = '123456';

    await register(name, email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockAuth.currentUser, { displayName: name });
  });
});

describe('logout', () => {
  it('should logout', async () => {
    signOut.mockResolvedValue();
    await logout();

    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(undefined);
  });
});
describe('isUserLogged', () => {
  it('should veryfy if the user is logged', async () => {
    onAuthStateChanged.mockResolvedValueOnce();
    await isUserLogged();

    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    expect(onAuthStateChanged).toHaveBeenCalledWith(undefined, undefined);
  });
});

