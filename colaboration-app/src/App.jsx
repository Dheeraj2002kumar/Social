import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://xto10x-65566-default-rtdb.firebaseio.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [username, setUsername] = useState("John Doe"); // Hardcoded username for now
  const [commentBox, setCommentBox] = useState(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}.json`);
      if (response.data) {
        setPosts(Object.entries(response.data).map(([id, post]) => ({ id, ...post })));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async () => {
    if (!newPost.trim()) return;
    const postData = {
      userimg: "", // Placeholder user image
      username,
      content: newPost,
      img: "", // No image by default
      likes: 0,
      comment: [],
    };
    try {
      await axios.post(`${API_URL}.json`, postData);
      setNewPost("");
      fetchPosts();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const likePost = async (postId, currentLikes) => {
    try {
      await axios.patch(`${API_URL}/${postId}.json`, {
        likes: currentLikes + 1,
      });
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const addComment = async (postId) => {
    if (!commentText.trim()) return;
    const post = posts.find(p => p.id === postId);
    const updatedComments = [...(post.comment || []), {
      commentuserImage: "",
      commentuser: username,
      comment: commentText,
    }];
    try {
      await axios.patch(`${API_URL}/${postId}.json`, { comment: updatedComments });
      setCommentText("");
      fetchPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <div className="post-box">
        <textarea style={{height:"100px"}}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        ></textarea>
        <button onClick={addPost}>Post</button>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post" style={{ backgroundColor: "white", padding: "15px", marginBottom: "15px", borderRadius: "8px" }}>
            <div className="post-header">
              <span dangerouslySetInnerHTML={{ __html: post.userimg }}></span>
              <span>{post.username}</span>
              <div className="options">...</div>
            </div>
            <hr />
            <p style={{color:"black"}}>{post.content}</p>
            {post.img && <img src={post.img} alt="Post" className="post-image" />}
            <hr />
            <div className="actions">
              <button onClick={() => likePost(post.id, post.likes)}>Like ({post.likes})</button>
              <button onClick={() => setCommentBox(commentBox === post.id ? null : post.id)}>Comment</button>
            </div>
            {commentBox === post.id && (
              <div className="comment-section" style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={() => addComment(post.id)}>Submit</button>
                <ul>
                  {post.comment?.map((comment, index) => (
                    <li key={index} style={{ backgroundColor: "#f0f0f0", padding: "5px", borderRadius: "5px", marginTop: "5px" }}>
                      <span dangerouslySetInnerHTML={{ __html: comment.commentuserImage }}></span>
                      <strong>{comment.commentuser}: </strong>{comment.comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
