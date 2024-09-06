import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANGi4DKIrlfMWlfnPGe0pPImvLbYaeT4k",
  authDomain: "sih-hackathon-906de.firebaseapp.com",
  projectId: "sih-hackathon-906de",
  storageBucket: "sih-hackathon-906de.appspot.com",
  messagingSenderId: "470534870675",
  appId: "1:470534870675:web:78c27fb81593265aaa5f66",
  measurementId: "G-49GM2H5B8N",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();