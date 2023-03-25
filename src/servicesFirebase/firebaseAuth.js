import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseInit';

export const createUser = (email, senha) => {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('foi');
      window.location.hash = '#login';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
