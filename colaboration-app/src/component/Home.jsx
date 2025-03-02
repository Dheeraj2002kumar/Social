import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name; // Get the name passed from Login page

  const handleLogout = () => {
    // Clear any stored user data (e.g., localStorage or sessionStorage)
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleAddPost = () => {
    navigate("/PostApp");
  };


  return (
    <div className="home-container">
      <h1>Welcome to the Dashboard!</h1>
      {name && <p>Hello, {name}!</p>} {/* Display user's name here */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <button onClick={handleAddPost} className="post-btn">
        Show Post
      </button>
    </div>
  );
};

export default Home;
