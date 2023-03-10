// nosso app importado de app.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { app } from './app.js';

// importacao das funcoes da autenticação de usuários do arquivo js do firebase referenciado nessa url

// variável executa a funcao getAuth em cima do nosso app
// variável recebe nosso app e permite que a gente execute as funcões autenticação em cima do nosso app
const auth = getAuth(app);
console.log(auth);

// funcao que criamos para abrigar a funcao de criar usuario com email e senha (já criada pelo firebase)
export function createUserWithEmail(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log('oi');
      console.log(userCredential);
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log('tchau');
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function signIn(email, password) {
  console.log('click');
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('oi-signi');
      console.log(userCredential);
      // Signed in
      const user = userCredential.user;
    // ...
    })
    .catch((error) => {
      console.log('tchau-sig');
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
