import { 
  getFirestore,
  collection,
  item,
  deleteDoc,
  query,
  orderBy,
  addDoc,
  updateDoc,
  onSnapshot,
 } from "firebase/firestore";

 import{ app } from './firebase.js'

 import { auth } from './login-firebase.js'




const db = getFirestore(app);

export const getPosts = async (exibirPost) =>{
  const queryOrder = query(collection(db, 'pots'), orderBy('data', 'desc'));
  onSnapshot(queryOrder,(querySnapshot) => {
   querySnapshot.forEach((item) =>{
    const feed = doc.data();
      feed.id = doc.id;
   exibirPost(data);
  });

  });
};

//export async function getPosts() {
  //  const arrPosts = [];
   // const orderingPosts = query(collection(db, "posts"), orderBy("data", "desc"));
   // await onSnapshot(q, (querySnapshot)=> {
     // document.querySelector('#user-all-posts').innerHTML = '';
   // querySnapshot.forEach((doc) => { // eslint-disable-line no-shadow
    //  const feed = doc.data();
    //  feed.id = doc.id;
    // posts (feed)
    //  });
   // return arrPosts;
 // })
//};
  
  // Função que alimenta a coleção "posts" no Clound Firestore
  export function creatPost(menssagem) {
    return addDoc(collection(db, "posts"), {
      menssagem, 
      data: new Date(),
      userId: auth.currentUser.uid,
      }).then((docRef) => ({
      id: docRef.id,
    }));
  }
  
   //Função para deletar o post
 export function deletePost(docId) {
    return deleteDoc(doc(db, "posts", docId));
 }
  
  // Função para editar o post
  export function editPost(id, menssagem) {
    const postRef = doc(db, "posts", id);
   return updateDoc(postRef, {
      menssagem,
        });
  }
  
 