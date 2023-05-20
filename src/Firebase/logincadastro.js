import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import { app } from './firebase.js';

const auth = getAuth(app);

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// registrar novo usuário
export async function criarUsuario(email, senha, usuario) {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, {
    displayName: usuario,
  });
}
