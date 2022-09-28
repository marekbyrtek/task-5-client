import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/SigningPage/Register";
import Login from "./components/SigningPage/Login";
import HomePage from "./components/Home/HomePage";
import { AuthContext } from "./AuthContext";

function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false
  });

  return (
    <Container className="d-flex align-items-center justify-content-center app-style">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </Container>
  );
}

export default App;
