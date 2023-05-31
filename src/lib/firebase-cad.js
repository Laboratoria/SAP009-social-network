import { getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const auth = getAuth();

export async function register(email, password, userName) {
  await createUserWithEmailAndPassword(auth, email, password);
  return updateProfile(auth.currentUser, {
    displayName: userName,
  });
}

