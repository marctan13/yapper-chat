import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      window.alert("Check the email provided for further instructions to reset your password.");
      navigate("/signin");
    } catch (error) {
      window.alert("Failed to Reset Password");
      console.error("Failed to reset password:", error);
    }
    setLoading(false);
  };

  return (
    <div className="forgotPass-formContainer">
      <div className="forgotPass-formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={handleSubmit} className="form" name="forgotPassword">
          <h1>
            <strong>Reset Password</strong>
          </h1>
          <input type="email" placeholder="Email..." ref={emailRef} required />
          <button type="submit" className="sign-in" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
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