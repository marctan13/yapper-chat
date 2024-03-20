import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Setting() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [passwordIsClicked, setPasswordIsClicked] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const { user, changeEmail, changePassword, logOut } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      await changeEmail(user, emailRef.current.value);
      setMessage("Check your email inbox for further instructions");
    } catch (error) {
      setError("Failed to Update Email");
      console.error("Failed to update email:", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      setPasswordError("");
      setPasswordMessage("");
      await changePassword(user, passwordRef.current.value);
      setPasswordMessage("Password has been changed! You will be signed out in 5 seconds");
      setTimeout(() => {
        logOut();
      }, 5000);
    } catch (error) {
      setPasswordError("Failed to Update Password");
    }
  };

  return (
    <div className="rightSection">
      <div className="header">
        <h1>Settings</h1>
      </div>
      <div className="chatWrapper">
        <p onClick={() => navigate("/")}>&lt; Back</p>
        <div className="username">
          <img src={user.photoURL ? user.photoURL : "avatar.png"} />
          <div className="username">
            <h1>{user.displayName}</h1>
            <span>{user.email}</span>
            <span>Email Verified: {user.emailVerified ? "Yes" : "No"}</span>
            <button
              className="editAccount"
              onClick={() => {
                setIsClicked(!isClicked);
                setError(!error);
              }}
            >
              Edit Account
            </button>
            {error && <h1>{error}</h1>}
            {message && <h1>{message}</h1>}
            {isClicked && (
              <form onSubmit={handleUpdateEmail}>
                <input
                  type="email"
                  placeholder="Enter new email"
                  ref={emailRef}
                />
                <button type="submit">Update Email</button>
              </form>
            )}
          </div>
        </div>
        <div className="changePassword">
          <h1>Password</h1>
          <button
            onClick={() => {
              setPasswordIsClicked(!passwordIsClicked);
              setError(!error);
            }}
          >
            Change Password
          </button>
          {passwordError && <h1>{passwordError}</h1>}
          {passwordMessage && <h1>{passwordMessage}</h1>}
          {passwordIsClicked && (
            <form onSubmit={handleUpdatePassword}>
              <input
                type="password"
                placeholder="Enter new password"
                ref={passwordRef}
                className="update-password"
              />
              <button type="submit">Update Password</button>
            </form>
          )}
        </div>
        <div className="notifications">
          <h1>Notifications</h1>
          <span>Do Not Disturb</span>
          <input type="checkbox" name="dnd" id="dnd" />
          <label htmlFor="dnd">Do Not Disturb</label>
        </div>
      </div>
    </div>
  );
}

export default Setting;
