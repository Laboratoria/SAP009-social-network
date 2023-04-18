import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "firebase.js";
import { async } from "regenerator-runtime";

const db = getFirestore(app);

export const newPost = async (date, id, like, text, username) =>
  addDoc(collection(db, "Post"), {
    username,
    date,
    text,
    id,
    like: [],
  });
