import { useState, useRef, useEffect } from "react";
import firebase from "firebase/compat/app";
import { auth, googleProvider } from "../firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function ForgotPassword() {
  const {forgotPassword, user } = useAuth();
  // const [error, setError] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={handleForgotPassword} className="form" name="forgotPassword">
          <input type="email" placeholder="Email..." ref={emailRef} required />
          <button type="submit" className="sign-in">
            Reset Password
          </button>
        </form>
        <div className="links">
            <button onClick={() => navigate("/sign")} className="link-btn">
              Back
            </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
