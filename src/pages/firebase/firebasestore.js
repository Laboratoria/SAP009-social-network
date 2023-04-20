import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { app } from "./firebase.js";
import { async } from "regenerator-runtime";

const db = getFirestore(app);

export const newPost = async (text, date, username, id) =>
  addDoc(collection(db, "Post"), {
    username,
    date,
    text,
    id,
    like: 0,
  });

export const getPost = async () => {
  const message = [];
  const order = query(collection(db, "Post"), orderBy("date", "desc"));
  const snapshot = await getDocs(order);
  snapshot.forEach((item) => {
    let data = item.data();
    const data_time = data.date;
    data.id = item.id;
    data.date = data_time.toDate().toLocaleDateString();
    data.hour = data_time.toDate().toLocaleTimeString();

    message.push(data);
  });
  return message;
};

//edit
//like/deslike
//excluir
//update
