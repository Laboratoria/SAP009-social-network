import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
      } from './export.js';

  export function registerUser(email, password) {
    return createUserWithEmailAndPassword(email, password);
  }

  export function signIn(email, password) {
    return signInWithEmailAndPassword(email, password);
  }

 // export function updateUsername(name) {
    //updateProfile(auth.currentUser, {
     // displayName: name,
   // });
  //}
  
  export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  
  

