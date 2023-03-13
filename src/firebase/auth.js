// nosso app importado de app.js
import { app } from "./app.js";

// importacao das funcoes da autenticação de usuários do arquivo js do firebase referenciado nessa url
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// variável executa a funcao getAuth em cima do nosso app
// variável recebe nosso app e permite que a gente execute as funcões autenticação em cima do nosso app
const auth = getAuth(app);
console.log(auth);

// funcao que criamos para abrigar a funcao de criar usuario com email e senha (já criada pelo firebase)
export function createUserWithEmail(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log("email-criado");
      console.log(userCredential);
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log("email-nao-criado");
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      return true;
    })
    .catch((error) => {
      return false;
    });
    }

const provider = new GoogleAuthProvider();
//console.log(provider);

export function loginGoogle() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      // Retornar true se a autenticação foi bem-sucedida
      return true;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // Retornar false se houver um erro na autenticação
      return false;
    });
}


export function LogOut() {
  signOut(auth, (user) => {
    console.log(user);
    if (user) {
      console.log(`Logout: Logged in as ${user.email}`);
    } else {
      console.log("Logout: No user");
    }
  });
}

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    console.log(`onAuthStateChange: Logged in as ${user.email}`);
  } else {
    console.log("onAuthStateChange: No user");
  }
});

