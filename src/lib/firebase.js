// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9RFAjw0v_NQ0GPBK6Df5_QeV_SPjQ1r4",
  authDomain: "familycircle-7a559.firebaseapp.com",
  projectId: "familycircle-7a559",
  storageBucket: "familycircle-7a559.appspot.com",
  messagingSenderId: "632527441230",
  appId: "1:632527441230:web:76f03fc12f7b015a94e21f",
  measurementId: "G-Y6V5ZM7DBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);