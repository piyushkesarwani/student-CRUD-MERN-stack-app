import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddStudent } from "./Components/AddStudent/AddStudent";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";

function App() {

  const [loginUser, setLoginUser] = useState({})

  return (
    <div className="App">
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" exact element={loginUser && loginUser._id ? (<AddStudent loginUser={loginUser} setLoginUser={setLoginUser} />) : (<Login setLoginUser={setLoginUser} />)} />
            <Route exact path="/login" element={<Login setLoginUser={setLoginUser} />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
