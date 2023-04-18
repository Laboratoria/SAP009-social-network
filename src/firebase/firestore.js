import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { app } from './firebase.js';

const db = getFirestore(app);

export const deletarPost = async (postId) => {
  deleteDoc(doc(db, "posts", postId));
}
