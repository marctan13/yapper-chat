import React, { useState, useRef } from "react";
import { auth, db } from "../firebase.js";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();
  const navigate = useNavigate();
  const { signUp, sendVerificationEmail } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      await updateProfile(auth.currentUser, {
        displayName: displayNameRef.current.value,
      }); //updates displayName of authenticated user upon registration
      const res = await addDoc(collection(db, "users"), {
        displayName: displayNameRef.current.value,
        email: emailRef.current.value,
        photoURL: null,
        timestamp: serverTimestamp(),
        uid: auth.currentUser.uid,
      }); //adds user to database
      sendVerificationEmail(auth.currentUser); //sends verification email to user upon registration
      setMessage("Account Register successful!");
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
      console.error(error);
      throw error;
    }
    setLoading(false);
  }

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
          {message && (
            <p>
              <strong>{message}</strong>
            </p>
          )}
          {error && (
            <p>
              <strong>{error}</strong>
            </p>
          )}
          <input
            required
            type="text"
            placeholder="Display Name"
            ref={displayNameRef}
          />
          <input required type="email" ref={emailRef} placeholder="Email" />
          <span>
            <strong>Password has to be at least 6 characters</strong>
          </span>
          <input
            required
            type="password"
            placeholder="Password"
            ref={passwordRef}
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
