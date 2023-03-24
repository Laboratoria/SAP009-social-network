import {
  getFirestore, addDoc, collection, getDocs, query, orderBy,
} from 'firebase/firestore';
import { app } from './app';

const db = getFirestore(app);

export const createPost = async (anime, episodes, description) => addDoc(collection(db, 'posts'), {
  animeName: anime,
  episodesAnime: episodes,
  descriptionAnime: description,
});

export const accessPost = async () => {
  const posts = [];
  const queryOrder = query(collection(db, 'posts'), orderBy('date', 'desc'));
  const querySnapshot = await getDocs(queryOrder);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    posts.push(data);
    console.log(doc.id, ' => ', doc.data());
  });
  return posts;
};
