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

const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

//FIRESTORE 
const db = getFirestore(app);

//FEED 

//o código define uma função que cria um novo documento na coleção "posts" do Firestore 
//com o autor definido como o usuário atualmente autenticado e o texto do post definido como o valor do parâmetro "textPost". A função retorna uma referência ao documento criado.

const criarPost = async (textPost) => {
  const post = {
    // retornando esse objeto  a const post
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
  const teste = await getDocs(collection(db, 'posts'));
  const textos = [];
  teste.forEach((doc) => {
    const data = doc.data();
    console.log(data)
    textos.push(data);
  });
  return textos;
}

// colocar nome do tutor no feed
const obterNomeUsuario = async () => {
  return auth.currentUser;
}

// chamando o onAuth QUE é o firebase
const verificaUsuarioLogado = (check) => {
  onAuthStateChanged(auth, check);
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