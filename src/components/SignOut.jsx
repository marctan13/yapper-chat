import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/signin");
    } catch (error) {
      console.log("failed to sign out");
    }
  };

  return (
    <div>
      <button className="sign-out" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
