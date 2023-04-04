import { initializeApp } from 'firebase/app';

import {
  getFirestore,
} from 'firebase/firestore';

import {
  firebaseConfig,
  collection,
  addDoc,
} from './firebaseconfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//função newPost - postagem, nome do usuário, data

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

