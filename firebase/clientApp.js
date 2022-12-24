import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log(process.env.NEXT_PUBLIC_APIKEY);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MSI,
  appId: process.env.NEXT_PUBLIC_APPID,
};
console.log(
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId
);
const twitter = new TwitterAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, twitter, app, db };
