import React, { useState } from 'react';
import './CommentForm.css'
const CommentForm = ({ postId, fetchPosts, username }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      window.alert('Error: Must login to post!');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: username, message }), // Only include the message field
      });

      if (response.ok) {
        fetchPosts(); // Refresh posts after adding a new comment
        //setUserName(username);
        setMessage(''); // Clear the message field after submission
      } else {
        console.error('Failed to add comment');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value); // Update the message state variable
  };

  return (
    <form onSubmit={handleCommentSubmit}>
      
      <div className = "commentForm"><p>Posting as: <strong>{username}</strong></p></div>
      
      <div className = "commentForm">
      <textarea
        placeholder="Add your comment"
        value={message}
        onChange={handleInputChange} // Use the handleInputChange function for onChange event
        required
      ></textarea>
      <button type="submit">Submit</button>

      </div>
    </form>
  );
};

export default CommentForm;

  