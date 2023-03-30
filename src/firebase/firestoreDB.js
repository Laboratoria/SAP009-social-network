import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from './firebase';

const db = getFirestore(app);

export const database = async (name, email) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name,
      email,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
