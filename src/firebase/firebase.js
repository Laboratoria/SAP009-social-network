import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

// Inicialize o Firebase Authentication e obtenha uma referência para o serviço
import {
  // setDoc,
  getFirestore,
  doc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  query,
  deleteDoc,
  orderBy,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import { app } from './firebase.config';

const auth = getAuth(app);
const db = getFirestore(app);

// função que autentica a usuária e armazena nome
export async function criarCadastro(email, senha, displayName) {
  const autenticacao = getAuth(app);
  await createUserWithEmailAndPassword(email, senha);
  // console.log(displayName);
  await updateProfile(autenticacao, {
    displayName,
  });
}

// obtendo usuária logada p/ exibir o nome dela
export const obterUsuaria = async () => {
  const autenticacao = getAuth();
  const usuaria = {
    uid: autenticacao.currentUser.uid,
    displayName: autenticacao.currentUser.displayName,
    email: autenticacao.currentUser.email,
    nomeUsuaria: autenticacao.currentUser.displayName,
  };
  return usuaria;
};

export function observador(callback) {
  onAuthStateChanged(auth, callback);
}
export function loginComGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}
export function fazerLogin(email, password) {
  const autenticacao = getAuth();
  return signInWithEmailAndPassword(autenticacao, email, password);
}

export async function sair() {
  await signOut(auth);
}

// funções do firestore

// criando uma postagem no firebase
export async function criarPostagem(textoDaPostagem) {
  const autenticacao = getAuth();
  const postagem = {
    idUsuaria: autenticacao.currentUser.uid,
    nomeUsuaria: autenticacao.currentUser.displayName,
    texto: textoDaPostagem,
    likes: [],
    data: new Date().toLocaleString(),
  };
  const docRef = await addDoc(collection(db, 'postagens'), postagem);
  postagem.id = docRef.id;
  // console.log(postagem);
  return postagem;
}

// buscando as postagens do firebase p/ exibir na tela
export async function buscarPostagens() {
  const ordenarData = query(collection(db, 'postagens'), orderBy('data', 'desc'));
  const postagens = [];
  const colecaoPostagens = await getDocs(ordenarData);
  colecaoPostagens.forEach((post) => {
    const postagem = {
      id: post.id,
      data: post.data().data,
      idUsuaria: post.data().idUsuaria,
      nomeUsuaria: post.data().nomeUsuaria,
      texto: post.data().texto,
      likes: post.data().likes,
    };
    postagens.push(postagem);
  });
  return postagens;
}

export const curtindoPostagem = async (idDoPost, uid) => updateDoc(doc(db, 'postagens', idDoPost), {
  likes: arrayUnion(uid),
});
export const descurtindoPostagem = async (idDoPost, uid) => updateDoc(doc(db, 'postagens', idDoPost), {
  likes: arrayRemove(uid),
});

export function excluindoPostagem(idDoPost) {
  const postRef = doc(db, 'postagens', idDoPost);
  deleteDoc(postRef);
}

export const editandoPostagem = (idDoPost, textoPostado) => {
  updateDoc(doc(db, 'postagens', idDoPost), {
    texto: textoPostado,
  });
};
