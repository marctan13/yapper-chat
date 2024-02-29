import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(emailRef.current.value);
      setMessage("Check inbox for further instructions");
    } catch (error) {
      setError("Failed to Reset Password");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={handleSubmit} className="form" name="forgotPassword">
          <h1>
            <strong>Reset Password</strong>
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
          <input type="email" placeholder="Email..." ref={emailRef} required />
          <button type="submit" className="sign-in">
            Reset Password
          </button>
        </form>
        <div className="links">
          <button onClick={() => navigate("/signin")} className="link-btn">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
