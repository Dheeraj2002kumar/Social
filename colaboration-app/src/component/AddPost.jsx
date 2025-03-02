
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addpost.css';

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((category) => category !== value));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      
      title,
      content,
      categories,
    };

    try {
      await axios.post("http://localhost:8080/blogs", newPost);
      navigate("/posts");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="add-post-container">
      <div className="add-post-form">
        <h2>Share Your Idea</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your idea title"
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your idea"
              required
            ></textarea>
          </div>

          {/* Category Checkboxes */}
          <div className="form-group">
            <label>Categories:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  value="Technology"
                  onChange={handleCheckboxChange}
                />
                Technology
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Art"
                  onChange={handleCheckboxChange}
                />
                Art
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Science"
                  onChange={handleCheckboxChange}
                />
                Science
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Education"
                  onChange={handleCheckboxChange}
                />
                Education
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
