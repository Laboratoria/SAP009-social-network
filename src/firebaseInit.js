// // Import the functions you need from the SDKs you need

import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDIYlqYI_G6ucr-Kq3tFC0lE69LJ5lr4Ts",
  authDomain: "code-girls-35638.firebaseapp.com",
  projectId: "code-girls-35638",
  storageBucket: "code-girls-35638.appspot.com",
  messagingSenderId: "123433307591",
  appId: "1:123433307591:web:5728eb81118ae6f3bfdde2",
  //storageBucket: "gs://code-girls-35638.appspot.com" 
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);







