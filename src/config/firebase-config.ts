import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  NextOrObserver,
  User,
} from "firebase/auth";
import { getFirebaseConfig } from "./firebase";

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);

export const signInUser = async (email: string, password: string) => {
  if (!email && !password) return;
  const res = await signInWithEmailAndPassword(auth, email, password);

  return res;
};

export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const SignOutUser = async () => {
  window.location.replace("/");
  await signOut(auth);
};
