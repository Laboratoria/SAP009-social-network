import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { firebaseConfig } from './firebaseconfig';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ao invés de definir uma função anonimima 'user',
// estamos recebendo a função'verificando'como parametro
export function verificaUsuarioLogado(verificando) {
  onAuthStateChanged(auth, verificando);
}
/* Cadastrar usuários */
export const createUser = async (email, senha, displayName) => {
  const authentication = getAuth(app);
  await createUserWithEmailAndPassword(authentication, email, senha);
  // const user = userCredential.user;
  await updateProfile(authentication.currentUser, { displayName });
};

/* Fazer Login do usuário */
export const valuesLogin = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

/* Login com Google */

const provider = new GoogleAuthProvider();
export const googleLogin = () => signInWithPopup(auth, provider);

/* Sair do perfil do usuário */
export const sairPerfil = () => signOut(auth);
