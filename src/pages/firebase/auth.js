import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
