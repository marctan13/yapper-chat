import React, { useState, useRef } from "react";
import { auth, db } from "../firebase.js";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  serverTimestamp,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();
  const displayNameRef = useRef();
  const navigate = useNavigate();
  const { signUp, sendVerificationEmail, user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");

  function checkPasswordStrength(password) {
    return password.length >= 6 ? "Strong" : "Weak";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const password = passwordRef.current.value;
    const verifyPassword = verifyPasswordRef.current.value;

    if (password !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match");
      return;
    } else {
      setVerifyPasswordError("");
    }

    try {
      setMessage("");
      setPasswordError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      await updateProfile(auth.currentUser, {
        displayName: displayNameRef.current.value,
      }); //updates displayName of authenticated user upon registration
      const res = await addDoc(collection(db, "users"), {
        displayName: displayNameRef.current.value,
        searchName: displayNameRef.current.value.toLowerCase(),
        email: emailRef.current.value,
        photoURL: null,
        created: serverTimestamp(),
        uid: auth.currentUser.uid,
        docid: "",
      });
      //assigns doc id to uid of document
      await updateDoc(res, {
        docid: res.id,
      });
      sendVerificationEmail(auth.currentUser); //sends verification email to user upon registration
      setMessage("Account Register successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      throw error;
    }
    setLoading(false);
  }

  function handlePasswordChange(e) {
    const password = e.target.value;
    setPasswordError("");
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength === "Weak" ? "Password is too short" : "");
  }

  function handleVerifyPasswordChange(e) {
    const password = passwordRef.current.value;
    const verifyPassword = e.target.value;

    if (password !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match");
    } else {
      setVerifyPasswordError("");
    }
  }

  return (
    <div className="register-container">
      <div className="register-formContainer">
        <div className={`register-formWrapper ${passwordError || verifyPasswordError ? 'error' : ''}`}>
          <div className="title-logo">
            <h1 className="logo">🗣️</h1>
            <h1 className="title">Yapper Chat</h1>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <h1>
              <strong>Register Account</strong>
            </h1>
            <input
              required
              type="text"
              placeholder="Display Name"
              ref={displayNameRef}
              className="register-input" 
            />
            <input 
              required 
              type="email" 
              ref={emailRef} 
              placeholder="Email"
              className="register-input" 
            />
            <input
              required
              type="password"
              placeholder="Password"
              ref={passwordRef}
              onChange={handlePasswordChange}
              className="register-input"
            />
            {passwordStrength && <div className="register-error">{passwordStrength}</div>}
            <input
              required
              type="password"
              placeholder="Verify Password"
              ref={verifyPasswordRef}
              onChange={handleVerifyPasswordChange}
              className="register-input"
            />
            {verifyPasswordError && <div className="register-error">{verifyPasswordError}</div>}
            <button
              className="register-button" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'} {/* Prevents the button from being spam clicked */}
            </button>
          </form>
          <p className="register-login-link">
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
