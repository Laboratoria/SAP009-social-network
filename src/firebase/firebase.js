import {
  initializeApp,
} from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

import {
  firebaseConfig
} from './firebase-config';

import {
  redirecionarPagina
} from '../redirecionar-pagina';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);


//autenticar usuário
function autenticarUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

//registrar novo usuário
async function criarUsuario(email, senha, nomeTutor) {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, {displayName: nomeTutor});
}

// login com google
function logarGoogle() {
  signInWithPopup(auth, provider)
    .then(() => {
      redirecionarPagina('#feed');
    })
    .catch(() => {});
}

//redefinir senha
const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

//FIRESTORE 
const db = getFirestore(app); 

const criarPost = async (textPost) => {
  const post = {
    author: auth.currentUser.uid,
    nomeTutor: auth.currentUser.displayName,
    texto: textPost,
  }
  const docRef = await addDoc(collection(db, 'posts'), post);
  post.id = docRef.id;
  return post;
};

// o código define uma função que obtém todos os documentos da coleção "posts" do Firestore, extrai o valor do campo "texto" de cada documento 
//e retorna um array contendo todos os textos dos documentos.
const obterPosts = async () => {
  const colecaoPosts = await getDocs(collection(db, 'posts'));
  const textos = [];
    colecaoPosts.forEach((post) => {
  const data = post.data();
    textos.push(data);
  });
  return textos;
}

// coleta todas as informações do usuário
const obterNomeUsuario = () => auth.currentUser;

// função p/ verificar se o usuario existe, se existir manda p/ o feed
//se não existir manda p/ o loggin
const verificaUsuarioLogado = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      redirecionarPagina('#feed');
    } else {
      redirecionarPagina('');
    }
  });
};

export {
  autenticarUsuario,
  criarUsuario,
  logarGoogle,
  redefinirSenha,
  criarPost,
  obterPosts,
  obterNomeUsuario, 
  verificaUsuarioLogado,
};