import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

//cadastro de usuarios novos
export const createUser = (email, senha, nome, sobrenome, displayName) => { //colocar dados faltantes aqui, displayname é o username
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      window.location.hash = "#Home";
      const user = userCredential.user; //aqui atualizar o perfil do usuario
      updateProfile(user, { nome, sobrenome, displayName } )

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      // ..
    });
};

export const login = (email, senha) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log("success", userCredential);
      window.location.hash = "#Home";
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      console.log("error", error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.hash = "#Home";
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const logOut = () => {

  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.hash = "#Login";

    })
    .catch((error) => {
      // An error happened.
    });
};


