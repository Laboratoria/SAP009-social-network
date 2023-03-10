import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseInit";
import { getDocs } from "firebase/firestore";


export const userData = async (name, lastname, username, email) =>{
    
    try {
    const docRef = await addDoc(collection(db, "users"), {
        nome: name,
        sobrenome: lastname,
        usuario: username,
        Email: email,
    });
    
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
};
export const newPost = async (postagem) =>{
    
    try {
    const docRef = await addDoc(collection(db, "posts"), {
        //Username: username,
        //data: dataPostagem,
        post: postagem,
    });
    
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
};

//criar colecao nova e guardar quando usuario digitar a postagem, guardar na colecao posts
//quando apertar botao postar, acontece o de cima ^



export const printPost = async () => {

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc);
    });
    
};

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

