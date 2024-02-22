import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App() {
  const [authUser, setAuthUser] = useState(null);

  //verifies user auth if logged in
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    console.log(authUser);

    return () => {
      listen();
    };
  }, []);

  console.log(auth.currentUser);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={authUser ? <Chatroom /> : <SignIn />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
