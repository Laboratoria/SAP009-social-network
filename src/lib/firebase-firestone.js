import { 
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  addDoc,
  updateDoc,

} from "firebase/firestore";

 import{ app } from './firebase.js'

 import { auth } from './login-firebase.js'

const db = getFirestore(app);

export async function getPosts() {
    const arrPosts = [];
    const orderingPosts = query(collection(db, "posts"), orderBy("data", "userId"));
    const querySnapshot = await getDocs(orderingPosts);
    querySnapshot.forEach((doc) => { // eslint-disable-line no-shadow
      const feed = doc.data();
      feed.id = doc.id;
      arrPosts.push(feed);
    });
    return arrPosts;
  }
  
  // Função que alimenta a coleção "posts" no Clound Firestore
  export function creatPost(menssagem) {
    return addDoc(collection(db, "posts"), {
      menssagem, 
      data: new Date(),
      userId: auth.currentUser.userId,
      }).then((docRef) => ({
      id: docRef.id,
    }));
  }
  
  // Função para deletar o post
 // export function deletePost(docId) {
   // return deleteDoc(doc(db, "posts", docId));
//  }
  
  // Função para editar o post
  //export function editPost(id, menssagem) {
   // const postRef = doc(db, "posts", id);
   // return updateDoc(postRef, {
      //menssagem,
       // });
 // }
  
 