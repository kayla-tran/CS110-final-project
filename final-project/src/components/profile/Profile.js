// Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ username }) => {
  const [userPosts, setUserPosts] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/posts?username=${username}`);
      const posts = await response.json();
      const filteredPosts = posts.filter((post) => post.username === username);
      setUserPosts(filteredPosts);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [username]);

  return (
    <div className="profile-container">
      <h1>Hello {username}</h1>
      <h2>Your Posts:</h2>
      <div className="post-container">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="post">
              {/* Render your post content here */}
              {/* Example: */}
              <h3>{post.caption}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts found for {username}.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
