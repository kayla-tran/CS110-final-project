import React, { useState, useEffect } from 'react';
import '../home/Home.css';
import '../post/Post.css';
import CommentForm from '../commentForm/CommentForm';
import chefHat from '../../assets/chefHat.jpeg'; // Assuming you have the path correct for the chef hat image

const Profile = ({ username }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [showComments, setShowComments] = useState({});

  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const fetchUserPosts = async () => {
    try {
      //const response = await fetch(`http://localhost:8080/posts?username=${username}`);
      const response = await fetch(`http://localhost:8080/posts`);
      const posts = await response.json();
      const filteredPosts = posts.filter((post) => post.username === username);
      setUserPosts(filteredPosts);

      // Initialize showComments state for each post
      const initialShowComments = {};
      filteredPosts.forEach(post => {
        initialShowComments[post._id] = false;
      });
      setShowComments(initialShowComments);

    } catch (err) {
      console.error('Error fetching user posts:', err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [username]);

  const toggleComments = (postId) => {
    setShowComments(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };



  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8080/profile/posts/${postId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the deleted post from the userPosts state
        setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <div className="profile-container">
      <h1>Hello {username + "!"}</h1>
      <h2>Your Posts:</h2>
      <div className="post-container">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
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
                  <p className="caption">{post.caption ?? 'No Caption'}</p>
                  <p className="content">{post.content ?? 'No Content'}</p>
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
                        <p><strong>{comment.user}:</strong> {comment.message}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                  <CommentForm postId={post._id} fetchPosts={fetchUserPosts} username={username} />
                </div>
              )}
              <button onClick={() => handleDeletePost(post._id)}>Delete</button>
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
