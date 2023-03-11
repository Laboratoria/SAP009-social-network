import {
  initializeApp
} from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  firebaseConfig
} from './firebase-config';
// os imports acima são de funções do firebase
import {
  redirecionarPagina
} from '../redirecionar-pagina';

//import do Firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

// const analytics = getAnalytics(app);

// aqui vamos criar as const que autenticar, registrar...

function autenticarUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

// registrar novo usuário
function criarUsuario(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha);
}

// login com google
function logarGoogle() {
  signInWithPopup(auth, provider)
    .then(() => {
      redirecionarPagina('#feed');
    })
    .catch(() => {});
}

const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

//FIRESTORE 
const db = getFirestore(app);

//FEED 

//o código define uma função que cria um novo documento na coleção "posts" do Firestore 
//com o autor definido como o usuário atualmente autenticado e o texto do post definido como o valor do parâmetro "textPost". A função retorna uma referência ao documento criado.
const criarPost = async (textPost) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    author: auth.currentUser.uid,
    texto: textPost,
  });
  return docRef;
};

// o código define uma função que obtém todos os documentos da coleção "posts" do Firestore, extrai o valor do campo "texto" de cada documento 
//e retorna um array contendo todos os textos dos documentos.
const obterPosts = async () => {
  const teste = await getDocs(collection(db, 'posts'));
  const textos = [];
  teste.forEach((doc) => {
    const data = doc.data();
    textos.push(data.texto);
  });
  return textos;
}

export {
  autenticarUsuario,
  criarUsuario,
  logarGoogle,
  redefinirSenha,
  criarPost,
  obterPosts,
};