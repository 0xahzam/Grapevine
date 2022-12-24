import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBICZkOs_l3BgNzMoBkrN9EqXKZmp-vbj0",
  authDomain: "pineapple-4d070.firebaseapp.com",
  projectId: "pineapple-4d070",
  storageBucket: "pineapple-4d070.appspot.com",
  messagingSenderId: "348292489925",
  appId: "1:348292489925:web:e3153ccc6fd4cce11206ac",
};

const twitter = new TwitterAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, twitter, app, db };
