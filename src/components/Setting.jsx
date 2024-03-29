import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Bluetooth } from "react-bootstrap-icons";

function Setting() {
  const navigate = useNavigate();
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
  const [currentUser, setCurrentUser] = useState(user);

  const emailRef = useRef();
  const passwordRef = useRef();
  const displayNameRef = useRef();

  // Updates the users display name without refreshing page
  useEffect(() => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      displayName: user.displayName,
    }));
  }, [user.displayName]);

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      await changeEmail(user, emailRef.current.value);
      setMessage("Check your email inbox for further instructions");
    } catch (error) {
      setError("Check new email address to complete changes");
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
    const newName = displayNameRef.current.value.trim();
    if (newName !== "") {
      if (newName.length <= 15) { // Character Limited 15
        try {
          setDisplayNameError("");
          // This grabs the name input and puts it into an array to capitalize
          // the 1st character (zero) and uppercase it.
          const capitalizedNewName =
            newName.charAt(0).toUpperCase() + newName.slice(1);
          await changeDisplayName(capitalizedNewName);
          alert("Display Name has been updated!");
  
          user.displayName = capitalizedNewName;

          setDisplayNameIsClicked(false);
        } catch (error) {
          alert("Failed to update username. Please try again.");
        }
      } else {
        alert("Display name must be 15 characters or less.");
      }
    } else {
      alert("Please enter a name.");
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
            <div>
              <div style={{ display: "flex" }}>
              <h1 className="userDisplayName">Display Name:  </h1>
                <h2 style={{ color: "navy" }}> {user.displayName}</h2>
                <button
                  className="editName"
                  onClick={() => {
                    setDisplayNameIsClicked(!displayNameIsClicked);
                    setError(!error);
                  }}
                  title="Edit Display Name"
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
                    className="displayNameInput"
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
                className="editEmail"
                onClick={() => {
                  setIsClicked(!isClicked);
                  setError(!error);
                }}
                title="Change Email"
                style={{ marginLeft: '4px' }}
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
                  className="newEmailInput"
                  placeholder="Enter new email"
                  ref={emailRef}
                />
                <button type="submit">Update Email</button>
              </form>
            )}
            <span>Email Verified: 
              <span style={{ color: user.emailVerified ? "green" : "red" }}>
                {user.emailVerified ? " Yes" : " No"}</span></span>
          </div>
        </div>
        <div className="changePassword">
          <h1>Password</h1>
          <button
            onClick={() => {
              setPasswordIsClicked(!passwordIsClicked);
              setError(!error);
            }}
            title="Change Password"
          >
            Change Password
          </button>
          {passwordError && <h1>{passwordError}</h1>}
          {passwordMessage && <h1>{passwordMessage}</h1>}
          {passwordIsClicked && (
            <form onSubmit={handleUpdatePassword}>
              <input
                type="password"
                className="newPasswordInput"
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
