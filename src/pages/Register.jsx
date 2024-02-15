import React from "react";
import { Link } from "react-router-dom";

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
  };

  //create user

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <h1>Register Account</h1>
          <input required type="text" placeholder="Display Name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <button>Sign up</button>
        </form>
        <p>
          You have an account already? <Link to="/signin">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
