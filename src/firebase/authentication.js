/* import { signUpButton } from '../pages/sign-up.js'; */
export default () => {
  firebase.auth().signInWithEmailAndPassword('any@email.com', '123456');
};
