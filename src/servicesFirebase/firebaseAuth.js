/* import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { btnCadastro } from '../../src/pages/cadastro/index';

const auth = getAuth(app);

export const btnCadastro = (email, senha) => {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('foi')
      window.location.hash = '#login';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}; */