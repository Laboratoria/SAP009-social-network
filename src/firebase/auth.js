import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from './app.js';

export const auth = getAuth(app);

export async function createUser(name, email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(auth.currentUser, {
    displayName: name,
  });
}
/* Cadastrar usuários 
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
  const user = userCredential.user;
  updateProfile(user, { email, password });
  console.log(auth.currentUser);
  return userCredential;
});*/


/* Fazer Login do usuário */
export const userLogin = (email, password) => signInWithEmailAndPassword(auth, email, password);

/* Login com Google */
  const provider = new GoogleAuthProvider();
  export const googleLogin = () => signInWithPopup(auth, provider);

/* Sair do perfil do usuário */
export const logOut = () => signOut(auth);