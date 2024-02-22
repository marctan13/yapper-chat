import firebase from "firebase/compat/app";
import { auth, googleProvider } from "../firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //how to check if signed in
  //auth.currentUser gets current user thats logged in
  console.log(auth?.currentUser?.email);
  console.log(auth.currentUser);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={signIn} className="form" name="signIn">
          <input
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Link to="/"> */}
          <button
            type="submit"
            onClick={() => navigate("/")}
            className="sign-in"
            onChange={signIn}
          >
            Sign in
          </button>
          {/* </Link> */}
        </form>
        {/* <Link to="/"> */}
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        {/* </Link> */}
        <div className="links">
          <button className="link-btn">Forgot Password?</button>
          <p>
            No account yet?{" "}
            <button onClick={() => navigate("/register")} className="link-btn">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
