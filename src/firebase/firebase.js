import firebaseConfig from './firebase-config.js';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
// os imports acima são de funções do firebase
import { redirecionarPagina } from "../redirecionar-pagina";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

//const analytics = getAnalytics(app);

// aqui vamos criar as const que autenticar, registrar...

function autenticarUsuario(email,senha) {
    return signInWithEmailAndPassword(auth, email, senha);
}

//registrar novo usuário
function cadastro(event, email, senha) {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log("Usuário registrado: ", userCredential.user);
            redirecionarPagina('#feed');
        })
        .catch((error) => {
            console.log("Erro: ", error);
        })
}

// login com google
function logarGoogle() {
    signInWithPopup(auth, provider)
        .then(() => {
            redirecionarPagina('#feed');
        })
        .catch((error) => {
            console.log(error);
        });
}

const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

export {autenticarUsuario, cadastro, logarGoogle, redefinirSenha};

