import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { db } from "../firebase.js";
import { auth } from "../firebase.js";
import { useAuth } from "../contexts/AuthContext";
// import { getDocs, addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      // auth.currentUser.displayName = displayName;
      auth.currentUser.displayName = displayNameRef.current.value;
      navigate("/");
      // history.push("/")
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  //create user

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <h1>
            <strong>Register Account</strong>
          </h1>
          <input
            required
            type="text"
            placeholder="Display Name"
            ref={displayNameRef}
            // onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            required
            type="email"
            ref={emailRef}
            placeholder="Email"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            ref={passwordRef}
            // onChange={(e) => setPassword(e.target.value)}
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
