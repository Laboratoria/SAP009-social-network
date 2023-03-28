import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword,
signInWithEmailAndPassword,
/*  GoogleAuthProvider,
signInWithPopup
*/ 
updateProfile, } from 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Cadastrar usuários */
export const createUser = (email, senha) => {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('foi');
      window.location.hash = '#login';
    });
   /*  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    }); */
  return updateProfile(user, { email, senha });
};

export const valuesLogin = (email, senha) => {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      window.location.href = '#feed';
      console.log('foi');
      const user = userCredential.user;
    })
    .catch(() => {
     /*  txtError.setAttribute('style', 'display: block');
      txtError.innerHTML = 'Usuário ou senha incorretos' */;
      /* senha.focus(); */
    });
}; 
/* signInWithPopup(auth, provider);
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
 */