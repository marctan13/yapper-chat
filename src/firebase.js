import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
    apiKey: "AIzaSyCBPB1QihtQKO284w3IrNoSbH8If9e801o",
    authDomain: "yapper-app-bc90b.firebaseapp.com",
    projectId: "yapper-app-bc90b",
    storageBucket: "yapper-app-bc90b.appspot.com",
    messagingSenderId: "738816601681",
    appId: "1:738816601681:web:4e0cfd712fccdc224a9270",
    measurementId: "G-6WLQG9E8RJ"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
