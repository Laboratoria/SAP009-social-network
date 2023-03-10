import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBcEY81KA3E-cZ4On7i9mHUFDO21uvbniE",
  authDomain: "code-girlsio.firebaseapp.com",
  projectId: "code-girlsio",
  storageBucket: "code-girlsio.appspot.com",
  messagingSenderId: "422411686703",
  appId: "1:422411686703:web:ef4d398502f4e6f7a747da"
   
};
  
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);












