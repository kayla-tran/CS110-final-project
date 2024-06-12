
import React, { useEffect, useState } from 'react';
import './Home.css';
import CommentForm from '../commentForm/CommentForm'; 
import chefHat from '../../assets/chefHat.jpeg';

const Home = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      const posts = await response.json();
      console.log('Fetched posts:', posts); // Debug log
      setPosts(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="element">
            <div className="top-bar">
              <div>
                <img src={chefHat} className="chefHat" alt="Chef Hat" />
              </div>
              <div>
                <h3>{post.username ?? 'Unknown User'}</h3>
              </div>
              <div>
                <p>{new Date(post.createdAt).toLocaleString() ?? 'Unknown Date'}</p>
              </div>
            </div>
          </div>
          <div className="element">
            {post.image ? (
              <img src={post.image} alt="Post" className="post-img" />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
          <div className="element">
            <div className="bottom-box">
              <p>{post.caption ?? 'No Caption'}</p>
              <p>{post.content ?? 'No Content'}</p>
            </div>
          </div>
          <div className = "element">
            <h4>Comments</h4>
              {post.comments.length > 0 ? (
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
        </div>
      ))}
    </div>
  );
};

export default Home;
