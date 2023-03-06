import firebaseConfig from './firebase-config.js';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// os imports acima são de funções do firebase
import { redirecionarPagina } from "../redirecionar-pagina";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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
            console.log("Usuário registrado: ", userCredential.user)
            redirecionarPagina('#feed');
        })
        .catch((error) => {
            console.log("Erro: ", error)
        })
}

// login com google

export {autenticarUsuario, cadastro}
