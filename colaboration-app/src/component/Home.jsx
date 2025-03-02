import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data (e.g., localStorage or sessionStorage)
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleAddPost = () => {
    navigate("/add-post")
  };

  const handleShowPost = () => {
    navigate("/posts")
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <button onClick={handleAddPost} className="post-btn">
        Add Post
      </button>
      <button onClick={handleShowPost} className="post-btn">
        Go to post
      </button>
    </div>
  );
};

export default Home;
