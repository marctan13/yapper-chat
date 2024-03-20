import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function Setting() {
  const [isClicked, setIsClicked] = useState(false);
  const [passwordIsClicked, setPasswordIsClicked] = useState(false);
  const [displayNameIsClicked, setDisplayNameIsClicked] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [displayNameMessage, setDisplayNameMessage] = useState("");
  const { user, changeEmail, changePassword, logOut, changeDisplayName } =
    useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      await changeEmail(user, emailRef.current.value);
      setMessage("Check your email inbox for further instructions");
    } catch (error) {
      setError(
        "Failed to Update Email. Check new email address to verify"
      );
      console.error("Failed to update email:", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      setPasswordError("");
      setPasswordMessage("");
      await changePassword(user, passwordRef.current.value);
      setPasswordMessage(
        "Password has been changed! You will be signed out in 3 seconds"
      );
      setTimeout(() => {
        logOut();
      }, 3000);
    } catch (error) {
      setPasswordError("Failed to Update Password");
      console.error(error);
      throw error;
    }
  };

  const handleUpdateDisplayName = async (e) => {
    e.preventDefault();
    if (displayNameRef !== "") {
      try {
        setDisplayNameError("");
        setDisplayNameMessage("");
        await changeDisplayName(displayNameRef.current.value);
        setDisplayNameMessage(
          "Display Name has been updated! Refresh to see changes"
        );
      } catch (error) {
        console.log("failed to change name");
      }
    } else {
      setDisplayNameMessage("Please enter a name");
    }
  };

  return (
    <div className="rightSection">
      <div className="header">
        <h1>Settings</h1>
      </div>
      <div className="settingsWrapper">
        <div className="username">
          <img src={user.photoURL ? user.photoURL : "avatar.png"} />
          <div className="username">
            <div>
              <div style={{ display: "flex" }}>
                <h1>{user.displayName}</h1>
                <button
                  onClick={() => {
                    setDisplayNameIsClicked(!displayNameIsClicked);
                    setError(!error);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
              {displayNameError && <h1>{displayNameError}</h1>}
              {displayNameMessage && <h1>{displayNameMessage}</h1>}
              {displayNameIsClicked && (
                <form onSubmit={handleUpdateDisplayName}>
                  <input
                    type="text"
                    placeholder="Enter new display name"
                    ref={displayNameRef}
                  />
                  <button type="submit">Update Display Name</button>
                </form>
              )}
            </div>
            <div style={{ display: "flex" }}>
              <span>{user.email}</span>
              <button
                className="editAccount"
                onClick={() => {
                  setIsClicked(!isClicked);
                  setError(!error);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
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
            <span>Email Verified: {user.emailVerified ? "Yes" : "No"}</span>
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
              />
              <button type="submit">Update Password</button>
            </form>
          )}
          <hr />
          <div className="notifications">
            <h1>Notifications</h1>
            <span>Do Not Disturb</span>
            <input type="checkbox" name="dnd" id="dnd" />
            <label htmlFor="dnd">Do Not Disturb</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
