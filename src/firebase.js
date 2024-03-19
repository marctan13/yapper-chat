import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "API-KEY",
  authDomain: "yapperchat-2c0f0.firebaseapp.com",
  projectId: "yapperchat-2c0f0",
  storageBucket: "yapperchat-2c0f0.appspot.com",
  messagingSenderId: "795336669832",
  appId: "1:795336669832:web:9dbe41d04889d31f74fd3d",
  measurementId: "G-N4763EEYVH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage };
