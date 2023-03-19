/* eslint-disable */
import { signIn, loginGoogle, LogOut, auth } from '../src/firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup, signOut, getAuth } from 'firebase/auth';

jest.mock('firebase/auth');

jest.clearAllMocks();

// jest.mock('firebase/auth', () => ({
//    getAuth: jest.fn(),
//    GoogleAuthProvider: jest.fn(),
//   // signInWithEmailAndPassword: jest.fn(),
//   createUserWithEmailAndPassword: jest.fn(),
//   // signInWithPopup: jest.fn(),
//   // sendPasswordResetEmail: jest.fn(),
// }));

describe('signIn', () => {
  it('returns true when the user successfully logs in', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});
    const result = await signIn('valid-email', 'valid-password');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
    
  });
 // jest.clearAllMocks();
  it('returns error when user email is invalid', async () => {
    const mockedError = 'auth/user-not-found';
    signInWithEmailAndPassword.mockRejectedValueOnce({ message: mockedError });
    try {
      await signIn('invalid-email', 'password');
    } catch (error) {
    //  console.log(error);
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(2); // CALLS 2 TIMES. PQ???
      expect(error).toEqual(new Error(mockedError));      
    }
  });
  //jest.clearAllMocks();
  it('returns error when user password is invalid', async () => {
    const mockedError = 'auth/wrong-password';
    signInWithEmailAndPassword.mockRejectedValueOnce({ message: mockedError});
    try {
      await signIn('valid-email@example.com', 'invalid-password');
    } catch (error) {
      console.log(error);
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(3);
      expect(error).toEqual(new Error(mockedError));
    }
  });  
});


describe('loginGoogle', () => {
  it('returns true when the user successfully logs in using Google Credencials', async () => {
    signInWithPopup.mockResolvedValueOnce({});
    const result = await loginGoogle('valid-email', 'valid-password');
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
    
  });
  
  it('returns error when the google user credentials are invalid', async () => {
   const mockedError = 'auth/user-not-found';
   signInWithPopup.mockRejectedValueOnce({ message: mockedError });
   try {
     await loginGoogle('invalid-email', 'password');
   } catch (error) {
     expect(signInWithPopup).toHaveBeenCalledTimes(2);
     expect(error).toEqual(new Error(mockedError));      
   }    
  }); 
});

// Função para saber se a pessoa fez logout
describe('logOut', () => {
  it('should show if the user is logged out', async () => {
   // signOut.mockResolvedValue();
   // signOut.mockResolvedValueOnce({});
    const result = await LogOut();
    expect(signOut).toHaveBeenCalledTimes(1);
    //expect(result).toBe(true);
    
    // try {
    //   await LogOut();
    // } catch (error) {
    //   expect(signOut).toHaveBeenCalledTimes(1);
    //   expect(error).toEqual(new Error(mockedError));      
    // }    
    
  });
});

// describe('LogOut', () => {
//   it('returns true when the user successfully logs in', async () => {
//     signOut.mockResolvedValueOnce({});
   
    
//     const result = await LogOut();
//     expect(signOut).toHaveBeenCalledTimes(1);
//     expect(result).toBe(true);
    
//   });
//});



