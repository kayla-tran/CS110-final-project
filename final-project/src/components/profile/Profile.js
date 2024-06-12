// Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ username }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  const handleUsernameUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8080/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername }),
      });
      if (response.ok) {
        setNewUsername('');
        // Ideally, you would update the username in the parent component and pass it down as a prop
        window.location.reload();
      } else {
        console.error('Failed to update username');
      }
    } catch (err) {
      console.error('Error updating username:', err);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8080/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (response.ok) {
        setCurrentPassword('');
        setNewPassword('');
      } else {
        console.error('Failed to update password');
      }
    } catch (err) {
      console.error('Error updating password:', err);
    }
  };



  return (
    <div className="profile-container">
      <h1>Hello {username}</h1>
      <h2>Your Posts:</h2>
      <div className="post-container">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="post" style={{ background: '#61dafb', margin: '20px' }}>
              <h3>{post.caption}</h3>
              <p>{post.content}</p>
              <img src={post.image} alt="Post" className="post-img" />
            </div>
          ))
        ) : (
          <p>No posts found for {username}.</p>
        )}
      </div>

      <div className="update-section">
        <h2>Update Username</h2>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="New Username"
        />
        <button onClick={handleUsernameUpdate}>Update Username</button>
      </div>

      <div className="update-section">
        <h2>Update Password</h2>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <button onClick={handlePasswordUpdate}>Update Password</button>
      </div>


    </div>
  );
};

export default Profile;
