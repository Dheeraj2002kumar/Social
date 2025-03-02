import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://xto10x-65566-default-rtdb.firebaseio.com/posts";
const IMGBB_API_KEY = "c967a294203ff3dae8ac90c9152d695b";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [username, setUsername] = useState("Ravish Kumar"); // username for now
  const [commentBox, setCommentBox] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaName, setMediaName] = useState("Add Image");

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setMedia(e.target.files[0]);
      setMediaName(`Add Image (${e.target.files[0].name.substring(0, 11)})`);
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData);
      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  const addPost = async () => {
    if (!newPost.trim() && !media) return;

    const imageUrlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
    const foundImage = newPost.match(imageUrlPattern);
    const mediaUrl = foundImage ? foundImage[0] : "";

    const postData = {
      userimg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>`,
      username: "john here",
      content: foundImage ? "" : newPost,
      img: mediaUrl || (media ? await uploadToImgBB(media) : ""),
      likes: 0,
      comment: [],
    };
    
    try {
      await axios.post(`${API_URL}.json`, postData);
      setNewPost("");
      setMedia(null);
      setMediaName("Add Image");
      document.querySelector("input[type='file']").value = "";
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
      commentuserImage: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>`,
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
      <textarea
        value={newPost}
        onChange={(e) => {
          setNewPost(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        placeholder="What's on your mind?"
      ></textarea>

        <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
        {/* update to check buttons style */}
        <div className="post-box-buttons">
        <button onClick={() => document.getElementById("fileInput").click()}>{mediaName}</button>
          <button onClick={addPost}>Post</button>
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post" >
            <div className="post-header">
              <span dangerouslySetInnerHTML={{ __html: post.userimg }}></span>
              <span>{post.username}</span>
              <div className="options">...</div>
            </div>
            <hr />
            <p style={{display:'flex',textAlign:'left',fontWeight:'500'}}>{post.content}</p>
            {post.img && <img src={post.img} alt="Post" className="post-image" />}
            <hr />
            <div className="actions">
              <button onClick={() => likePost(post.id, post.likes)}>Like ({post.likes})</button>
              <button onClick={() => setCommentBox(commentBox === post.id ? null : post.id)}>Comment ({post.comment?.length || 0})</button>
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
