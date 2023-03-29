// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqhzhGRhdoUTL33_p6tCJr2vebgFp7opA",
  authDomain: "dev-s-812b9.firebaseapp.com",
  projectId: "dev-s-812b9",
  storageBucket: "dev-s-812b9.appspot.com",
  messagingSenderId: "8788596570",
  appId: "1:8788596570:web:d82917f73fa9b6162d4563",
  measurementId: "G-G2ZN0DG79T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
