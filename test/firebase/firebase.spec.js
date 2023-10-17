import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import {
  createUserWithEmail, signIn, loginGoogle, logOut, checkLoggedUser, getUserId,
} from '../../src/firebase/auth';

jest.mock('firebase/auth');

jest.clearAllMocks();

const auth = {
  currentUser: {},
};
getAuth.mockReturnValue(auth);

describe('createUserWithEmail', () => {
  it('should create a new user and update the profile', async () => {
    const userCredential = {
      user: {},
    };
    createUserWithEmailAndPassword.mockResolvedValue(userCredential);

    const email = 'teste@teste.com';
    const password = 'teste123';
    const name = 'Fulana';
    await createUserWithEmail(name, email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(auth.currentUser, { displayName: name });
  });
});

describe('signIn', () => {
  it('should login with an email and password', async () => {
    await signIn('email@teste.com', '123456');

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'email@teste.com', '123456');
  });
});

describe('loginGoogle', () => {
  it('should login with a Google account', async () => {
    signInWithPopup.mockResolvedValue();
    await loginGoogle();

    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(auth, {});
  });
});

describe('logOut', () => {
  it('should show if the user is logged out', async () => {
    signOut.mockResolvedValue();
    await logOut();
    expect(signOut).toHaveBeenCalledTimes(1);
    expect(signOut).toHaveBeenCalledWith(auth);
  });
});

describe('checkLoggedUser', () => {
  it('deve verificar se o usuário logado está autenticado', () => {
    checkLoggedUser();
    expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
  });
});

describe('getUserId', () => {
  it('should show the user id', () => {
    getUserId();
    expect(getAuth).toHaveBeenCalledTimes(6);
  });
});
