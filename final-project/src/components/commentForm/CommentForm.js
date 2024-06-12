import React, { useState } from 'react';

const CommentForm = ({ postId, fetchPosts, username }) => {
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, message }), // Only include the message field
      });

      if (response.ok) {
        fetchPosts(); // Refresh posts after adding a new comment
        setUserName(username);
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
      <p>Posting as: <strong>{username}</strong></p>
      <textarea
        placeholder="Add your comment"
        value={message}
        onChange={handleInputChange} // Use the handleInputChange function for onChange event
        required
      ></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;

  