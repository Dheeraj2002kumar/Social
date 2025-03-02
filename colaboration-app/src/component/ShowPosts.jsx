import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowPosts.css';

// const ShowPosts = () => {
//   // State to store the blog posts
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from the local server when the component mounts
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/blogs")
//       .then((response) => {
//         setBlogs(response.data); // Set the fetched data to state
//         setLoading(false); // Set loading to false once data is fetched
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the data!", error);
//         setLoading(false); // Handle error case by stopping loading
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading message while fetching data
//   }

//   return (
//     <div className="App">
//       <h1>Blog Posts</h1>
//       <div className="blog-list">
//         {blogs.map((blog) => (
//           <div key={blog.id} className="blog-item">
//             <h2>{blog.title}</h2>
//             <p>{blog.content}</p>
//             <div className="categories">
//               <strong>Categories: </strong>
//               {blog.categories.join(", ")}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



const ShowPosts = () => {
  // State to store the blog posts and loading state
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

  // Handle Like functionality
  const handleLike = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
      )
    );
  };

  // Handle Comment functionality
  const handleComment = (id, comment) => {
    if (comment) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id
            ? { ...blog, comments: [...(blog.comments || []), comment] }
            : blog
        )
      );
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <h1 >Blog Posts</h1>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <div className="categories">
              <strong>Categories: </strong>
              {blog.categories.join(", ")}
            </div>

            {/* Like Button */}
            <button className="like-btn" onClick={() => handleLike(blog.id)}>
              Like {blog.likes || 0}
            </button>

            {/* Comment Button and Input */}
            <button
              className="comment-btn"
              onClick={() => {
                const comment = prompt("Enter your comment:");
                if (comment) {
                  handleComment(blog.id, comment);
                }
              }}
            >
              Comment
            </button>

            {/* Display Comments */}
            <div className="comments">
              {blog.comments && blog.comments.length > 0 && (
                <ul>
                  {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowPosts
