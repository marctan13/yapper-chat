import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db } from "../firebase.js";
import { auth } from "../firebase.js";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.displayName = displayName;
        console.log(userCredential);
        console.log(userCredential.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const userCollectionRef = collection(db, "users");

  // const getUserList = async() => {
  //   try{
  //     const data = await getDocs(userCollectionRef)

  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setDisplayName(e.target[0].value);
  //   setEmail(e.target[1].value);
  //   setPassword(e.target[2].value);

  // };

  console.log(displayName, email, password);

  //create user

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={signUp} className="form">
          <h1>Register Account</h1>
          <input
            required
            type="text"
            placeholder="Display Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signUp}>
            Sign up
          </button>
        </form>
        <p>
          You have an account already? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
