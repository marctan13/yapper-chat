import firebase from "firebase/compat/app";
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //how to check if signed in
  //auth.currentUser gets current user thats logged in
  // console.log(auth?.currentUser?.email);
  console.log(auth.currentUser);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={handleSubmit} className="form" name='signIn'>
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/">
            <button className="sign-in" onChange={signIn}>
              Sign in
            </button>
          </Link>
        </form>
        <Link to="/">
          <button className="sign-in" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </Link>
        <div className="links">
          <p className="link-btn">Forgot Password?</p>
          <p>
            No account yet?{" "}
            <Link to="/register">
              <span className="link-btn">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
