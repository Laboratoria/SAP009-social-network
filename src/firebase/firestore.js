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
/*
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
*/

export const accessPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'), orderBy('date', 'desc'));
  const posts = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    posts.push(data);
    // post.push({ ...post.data(), id: post.id });
  });
  return posts;
};

/*
export const accessPost = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'), orderBy('date'));
    const posts = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      posts.push(data);
      // post.push({ ...post.data(), id: post.id });
    });
    return posts;
  } catch (error) {
    return error;
  }
};
*/
