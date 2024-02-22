import { auth } from "../firebase.js";
import { Link } from "react-router-dom";

function SignOut() {
  return (
    auth.currentUser && (
      <div>
        <Link to="/signin">
          <button className="sign-out" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </Link>
      </div>
    )
  );
}

export default SignOut;
