import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // New state for the user's name
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Dummy credentials for validation (replace with real API in production)
  const validUsername = "admin";
  const validPassword = "password123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === validUsername && password === validPassword) {
      // Redirect to the homepage (or dashboard) and pass the user's name as state
      navigate("/home", { state: { name } });
      localStorage.setItem("username", name);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>    
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Name</label> {/* New Name field */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
