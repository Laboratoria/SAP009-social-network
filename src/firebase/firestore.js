import {
  getFirestore, addDoc, collection, getDocs, orderBy,
} from 'firebase/firestore';
import { app } from './app';

const db = getFirestore(app);

export const createPost = (anime, episodes, description) => { //eslint-disable-line
  return addDoc(collection(db, 'posts'), {
    anime,
    episodes,
    description,
  });
};

export const accessPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'), orderBy('date'));
  const posts = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    posts.push(data);
  });
  return posts;
};
