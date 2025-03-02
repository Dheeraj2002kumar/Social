import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowPosts.css';

const ShowPosts = () => {
  // State to store the blog posts
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the local server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/blogs")
      .then((response) => {
        setBlogs(response.data); // Set the fetched data to state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false); // Handle error case by stopping loading
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="App">
      <h1>Blog Posts</h1>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <div className="categories">
              <strong>Categories: </strong>
              {blog.categories.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ShowPosts
