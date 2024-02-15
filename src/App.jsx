import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Chatroom />}></Route>
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
