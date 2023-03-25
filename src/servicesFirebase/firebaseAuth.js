import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseInit';

/*Cadastrar usuários*/
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
};

//Entrar com email e senha//
export const valuesLogin = (email, senha) => {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      window.location.href = "pages/feed/index.html";
      console.log("foi");
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};
