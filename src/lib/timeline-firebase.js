import { getFirestore, collection, addDoc } from "firebase/firestore";
const timelineCollection = await addDoc(collection(db, "posts"), {
    text: "Este é o conteúdo do meu novo post",
    userId: "João da Silva",
    data: new Date()
  });
  
  const db = getFirestore(app);

 
  