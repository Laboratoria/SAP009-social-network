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
  getDoc,
  doc,
  setDoc
} from "firebase/firestore";
import { async } from 'regenerator-runtime';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);


//autenticar usuário
function autenticarUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

//registrar novo usuário
async function criarUsuario(email, senha, nomeTutor, nomeCao) {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, { displayName: nomeTutor });

  const usuario = {
    email: email,
    nomeTutor: nomeTutor,
    nomeCao: nomeCao
  };

  await setDoc(doc(db, 'usuarios', auth.currentUser.uid), usuario)
}

// login com google
function logarGoogle() {
  signInWithPopup(auth, provider)
    .then(() => {
      //oh Tali tenta salvar o cao na collection (nomeCao padrao) e dps um campo para editar os dados e inserir o nome respectivo
      redirecionarPagina('#feed');
    })
    .catch(() => { });
}

//redefinir senha
const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

//FIRESTORE 

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
  console.log(auth.currentUser)
  const colecaoPosts = await getDocs(collection(db, 'posts'));
  const textos = [];
  colecaoPosts.forEach((post) => {
    const data = post.data();
    textos.push(data);
  });
  return textos;
}

// coleta todas as informações do usuário
const obterNomeUsuario = async () => {
 
  const usuarioRef = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));

  const usuario = {
    displayName: auth.currentUser.displayName,
    email: usuarioRef.data().email,
    nomeTutor: usuarioRef.data().nomeTutor,
    nomeCao: usuarioRef.data().nomeCao,
  }

  console.log(usuario);

  return usuario;
}

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
// editar post usuario

//opção de sair
const sair = () => signOut(auth);

export {
  autenticarUsuario,
  criarUsuario,
  logarGoogle,
  redefinirSenha,
  criarPost,
  obterPosts,
  obterNomeUsuario,
  verificaUsuarioLogado,
  sair,
};