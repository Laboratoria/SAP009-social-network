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
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

import {
  firebaseConfig,
} from './firebase-config';

import {
  redirecionarPagina,
} from '../redirecionar-pagina';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
// FIRESTORE
const db = getFirestore(app);

// autenticar usuário
function autenticarUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

// registrar novo usuário
async function criarUsuario(email, senha, nomeTutor, nomeCao) {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, {
    displayName: nomeTutor,
  });

  const usuario = {
    email,
    nomeTutor,
    nomeCao,
  };

  await setDoc(doc(db, 'usuarios', auth.currentUser.uid), usuario);
}

// login com google
async function logarGoogle() {
  await signInWithPopup(auth, provider);

  const usuarioGoogle = {
    email: auth.currentUser.email,
    nomeTutor: auth.currentUser.displayName,
    nomeCao: 'insira o nome do seu cãozinho',
  };

  await setDoc(doc(db, 'usuarios', auth.currentUser.uid), usuarioGoogle);
  redirecionarPagina('#feed');
}

// redefinir senha
const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

const criarPost = async (textPost) => {
  const dataCriacao = Date.now();
  const dataAtual = new Date(dataCriacao);
  const dataPostagem = dataAtual.toLocaleDateString();

  const post = {
    author: auth.currentUser.uid,
    nomeTutor: auth.currentUser.displayName,
    texto: textPost,
    likes: [],
    data: dataPostagem,
  };
  const docRef = await addDoc(collection(db, 'posts'), post);
  post.id = docRef.id;
  return post;
};

// o código define uma função que obtém todos os documentos da coleção "posts" do Firestore,
// extrai o valor do campo "texto" de cada documento
// e retorna um array contendo todos os textos dos documentos.
const obterPosts = async () => {
  const colecaoPosts = await getDocs(collection(db, 'posts'));
  const textos = [];
  colecaoPosts.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    textos.push(data);
  });
  return textos;
};

// coleta todas as informações do usuário
const obterNomeUsuario = async () => {
  const usuarioRef = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));

  console.log(auth.currentUser);
  console.log(usuarioRef);

  const usuario = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    email: usuarioRef.data().email,
    nomeTutor: usuarioRef.data().nomeTutor,
    nomeCao: usuarioRef.data().nomeCao,
  };

  console.log(usuario);

  return usuario;
};

// função p/ verificar se o usuario existe, se existir manda p/ o feed
// se não existir manda p/ o loggin
const verificaUsuarioLogado = () => {
  onAuthStateChanged(auth, (users) => {
    if (users) {
      redirecionarPagina('#feed');
    } else {
      redirecionarPagina('');
    }
  });
};

// excluir post
const deletarPost = (postId) => {
  const postRef = doc(db, 'posts', postId);
  deleteDoc(postRef);
};

// editar Post
const editarPost = (postId, textPost) => {
  const dataCriacao = Date.now();
  const dataAtual = new Date(dataCriacao);
  const dataPostagem = dataAtual.toLocaleDateString();
  updateDoc(doc(db, 'posts', postId), {
    texto: textPost,
    data: dataPostagem,
  });
};

// curtit post
function curtir(postId, uid) {
  const docRef = doc(db, 'posts', postId);
  updateDoc(docRef, {
    likes: arrayUnion(uid),
  });
}

//descurtir 
function descurtir(postId, uid) {
  const docRef = doc(db, 'posts', postId);
  updateDoc(docRef, {
    likes: arrayRemove(uid),
  });
}

export {
  autenticarUsuario,
  criarUsuario,
  logarGoogle,
  redefinirSenha,
  criarPost,
  obterPosts,
  obterNomeUsuario,
  verificaUsuarioLogado,
  deletarPost,
  editarPost,
  curtir,
  descurtir,
};
