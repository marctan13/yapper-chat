import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/Protected.jsx";

function App() {
  // const [authUser, setAuthUser] = useState(null);

  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route exact path="/">
            <Route
              index
              element={
                <Protected>
                  <Chatroom />
                </Protected>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/settings"
              element={
                <Protected>
                  <Settings />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
