import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const createUser = (name, password, email) =>
  createUserWithEmailAndPassword(auth, email, password, name);
