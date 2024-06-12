import React, { useEffect, useState } from 'react';
import './Home.css';
import CommentForm from '../commentForm/CommentForm'; 
import chefHat from '../../assets/chefHat.jpeg';

const Home = ({ username }) => {
  const [posts, setPosts] = useState([]);

  // State to manage comment container visibility
  const [showComments, setShowComments] = useState({});

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      const posts = await response.json();
      console.log('Fetched posts:', posts); // Debug log
      // Initialize showComments state for each post
      const initialShowComments = {};
      posts.forEach(post => {
        initialShowComments[post._id] = false;
      });
      setShowComments(initialShowComments);
      setPosts(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to toggle comment container visibility
  const toggleComments = (postId) => {
    setShowComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  return (
    <div className="post-container">
      <p></p>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="element">
            <div className="top-bar">
              <div>
                <img src={chefHat} className="chefHat" alt="Chef Hat" />
              </div>
              <div>
                <h3>@{post.username ?? 'Unknown User'}</h3>
              </div>
              <div>
                <p>{new Date(post.createdAt).toLocaleString() ?? 'Unknown Date'}</p>
              </div>
            </div>
          </div>
          <div className="element post-content"> {/* Move post-content below top-bar */}
            <div>
              {post.image ? (
                <img src={post.image} alt="Post" className="post-img" />
              ) : (
                <p>No Image Available</p>
              )}
            </div>
            <div className="bottom-box">
              <p className = "caption">{post.caption ?? 'No Caption'}</p>
              <p className = "content">{post.content ?? 'No Content'}</p>
            </div>
          </div>
          {/* Comment button */}
          <button className="comments" onClick={() => toggleComments(post._id)}>Comments</button>
          {/* Comment container */}
          {showComments[post._id] && (
            <div className="comment-container">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p><strong>{comment.username}:</strong> {comment.message}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
              <CommentForm postId={post._id} fetchPosts={fetchPosts} username={username} /> 
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
