import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../src/firebase/configuration.js';
import { loginToFeed, loginWithGoogle, register } from '../src/firebase/authentication.js';


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

describe ('register', () => {
  it ('registrar um novo usuário', () => {
    register('Bruna', 'brunasilveira.adm@gmail.com', '123456')
    loginToFeed('Bruna', '123456')
    .then(data => {
      console.log (data)
      expect(data.user.displayName).toBe('Bruna')
    })
  })
  it ('mensagem de email inválido', () => {
    register('Bruna', 'brunasilveira.admgmail.com', '123456')
    .catch(error => {
      console.log (error)
      expect(errorLogin(error)).toBe('Invalid email')
    })
  }) 
})
