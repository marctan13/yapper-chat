import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
    apiKey: "AIzaSyAkCDXQdHEhy3v4VTshG0jZGTJF6vVk4B0",
    authDomain: "yapperchat-2c0f0.firebaseapp.com",
    projectId: "yapperchat-2c0f0",
    storageBucket: "yapperchat-2c0f0.appspot.com",
    messagingSenderId: "795336669832",
    appId: "1:795336669832:web:9dbe41d04889d31f74fd3d",
    measurementId: "G-N4763EEYVH"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
